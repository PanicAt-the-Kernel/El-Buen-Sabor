import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";
import ListContainerPedido from "../../componentes/ui/cliente/VistaPedidoCliente/ListContainerPedido";
import FormSelectPago from "../../componentes/ui/cliente/VistaPedidoCliente/FormSelectPago";
import FormSelectDomicilio from "../../componentes/ui/cliente/VistaPedidoCliente/FormSelectDomicilio";
import { useContext, useState } from "react";
import { AttachMoney } from "@mui/icons-material";
import { CarritoContext } from "../../context/CarritoContext";
import { llamarMercadoPago, savePedido } from "../../servicios/PedidoService";
import Pedido from "../../entidades/Pedido";
import Cliente from "../../entidades/Cliente";
import Sucursal from "../../entidades/Sucursal";
import PreferenceMP from "../../entidades/PreferenceMP";
import Domicilio from "../../entidades/Domicilio";
import ModalMercadoPago from "../../componentes/ui/cliente/VistaPedidoCliente/ModalMercadoPago";
import { localSession } from "../../servicios/localSession";

export default function VistaPedidoCliente() {
  const [open, setOpen] = useState(false);
  const [metodoEntrega, setMetodoEntrega] = useState<string>("TAKE_AWAY");
  const [metodoPago, setMetodoPago] = useState<string>("MERCADO_PAGO");
  const [domicilio, setDomicilio] = useState<number>(0);
  const [preference, setPreference] = useState<PreferenceMP>(
    new PreferenceMP()
  );
  const { carrito, totalPedido, totalEnvio, setTotalPedido, vaciarCarrito } =
    useContext(CarritoContext);
  let datosPedido: Pedido = new Pedido();
  const cliente: Cliente = localSession.getCliente("Cliente");
  const sucursal: Sucursal = localSession.getSucursal("sucursal");

  const postPedido = async () => {
    var fecha = new Date().toJSON().slice(0, 10); //Dia actual

    datosPedido = {
      ...datosPedido,
      horaEstimadaFinalizacion: "22:00:00.000",
      totalCosto: 0,
      estado: "PENDIENTE",
      sucursal: sucursal,
      cliente: cliente,
      fechaPedido: fecha,
      factura: null,
      detallePedidos: carrito,
      empleado: null,
    };
    //POST SIN DOMICILIO
    if (metodoEntrega == "TAKE_AWAY") {
      if (metodoPago == "EFECTIVO") {
        datosPedido = {
          ...datosPedido,
          total: totalPedido,
          tipoEnvio: metodoEntrega,
          formaPago: metodoPago,
          domicilio: sucursal.domicilio,
        };
        await savePedido(datosPedido, setTotalPedido, vaciarCarrito, 0);
        window.location.replace("/cliente/pedidos");
      } else {
        console.log("LLAMADA MERCADO PAGO Y RETIRO POR SUCURSAL");
        //HACER POST Y LLAMAR MERCADOPAGO
        datosPedido = {
          ...datosPedido,
          total: totalPedido,
          tipoEnvio: metodoEntrega,
          formaPago: metodoPago,
          domicilio: sucursal.domicilio,
        };
        let pedidoID = await savePedido(
          datosPedido,
          setTotalPedido,
          vaciarCarrito,
          0
        );
        if (pedidoID != undefined) {
          let idMP = await llamarMercadoPago(pedidoID);
          if (idMP != undefined) {
            setPreference(idMP);
            setOpen(!open);
          } else {
            return;
          }
        } else {
          return;
        }
      }
    } else {
      //POST CON DOMICILIO
      const domi=cliente.domicilios.find((item:Domicilio)=>item.id==domicilio);
      datosPedido = {
        ...datosPedido,
        total: totalPedido,
        tipoEnvio: metodoEntrega,
        formaPago: metodoPago,
        domicilio: domi!,
      };
      //HACER POST
      let pedidoID = await savePedido(
        datosPedido,
        setTotalPedido,
        vaciarCarrito,
        20
      );
      if (pedidoID != undefined) {
        let idMP = await llamarMercadoPago(pedidoID);
        if (idMP != undefined) {
          setPreference(idMP);
          setOpen(!open);
        } else {
          return;
        }
      }else{
        alert("Debes seleccionar un domicilio")
        return;
      }
      
    }
  };

  const generarBoton = () => {
    if (metodoPago == "EFECTIVO") {
      return (
        <Button
          variant="contained"
          color="info"
          sx={{ marginBottom: 2 }}
          onClick={() => {
            postPedido();
          }}
        >
          Generar Pedido
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="warning"
          sx={{ marginBottom: 2 }}
          onClick={() => {
            postPedido();
          }}
        >
          Ir a pagar
        </Button>
      );
    }
  };
  return (
    <ClienteLayout estado={open} setEstado={setOpen}>
      <Container>
        <Box
          component="div"
          sx={{
            backgroundColor: "#282828",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            marginBottom: 2,
            padding: 2,
          }}
        >
          <Typography variant="h5" color="white" textAlign="center">
            Revisa tu pedido
          </Typography>
        </Box>
        <Paper
          elevation={5}
          sx={{
            marginTop: 2,
          }}
        >
          <Stack alignItems="center">
            <ListContainerPedido carrito={carrito} />
            <Button variant="contained" color="success">
              Total Pedido <AttachMoney />
              <Typography>
                {metodoEntrega == "TAKE_AWAY"
                  ? totalPedido * (1 - 0.1)
                  : totalPedido + totalEnvio}
              </Typography>
            </Button>
            <FormSelectPago
              metodoEntrega={metodoEntrega}
              metodoPago={metodoPago}
              setMetodoEntrega={setMetodoEntrega}
              setMetodoPago={setMetodoPago}
            />
            <Typography sx={{ padding: 3 }} textAlign="center">
              Obtene un 10% Off retirando en sucursal
            </Typography>
          </Stack>
          <FormSelectDomicilio
            metodoEntrega={metodoEntrega}
            domicilio={domicilio}
            setDomicilio={setDomicilio}
            domicilios={cliente.domicilios}
          />
          <Stack direction="row" justifyContent="center">
            {generarBoton()}
          </Stack>
        </Paper>
        <ModalMercadoPago preferenceID={preference} open={open} setOpen={()=>{}}/>
      </Container>
    </ClienteLayout>
  );
}
