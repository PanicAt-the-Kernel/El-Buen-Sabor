import { ArrowDropDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import Pedido from "../../../../entidades/Pedido";
import ModalListadoProductos from "./ModalListadoProductos";
import { useState } from "react";
import {
  actualizarEstadoPedido,
  llamarMercadoPago,
} from "../../../../servicios/PedidoService";
import PreferenceMP from "../../../../entidades/PreferenceMP";
import ModalMercadoPago from "../VistaPedidoCliente/ModalMercadoPago";
import { KeyedMutator } from "swr";

interface AcordeonPedidoTypes {
  pedido: Pedido;
  mutador:KeyedMutator<Pedido[]>
}

export default function AcordeonPedido({ pedido,mutador }: AcordeonPedidoTypes) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openMercadoPago, setOpenMercadoPago] = useState<boolean>(false);
  const [preference, setPreference] = useState<PreferenceMP>(
    new PreferenceMP()
  );

  function colorFondo() {
    switch (pedido.estado) {
      case "PENDIENTE":
        return { backgroundColor: "#ffe69c" };
      case "CANCELADO":
        return { backgroundColor: "#ea868f" };
      case "RECHAZADO":
        return { backgroundColor: "#ea868f" };
      case "TERMINADO":
        return { backgroundColor: "#75b798" };
      case "DELIVERY":
        return { backgroundColor: "#6ea8fe" };
      case "APROBADO":
        return { backgroundColor: "#79dfc1" };
      case "FACTURADO":
        return { backgroundColor: "#feb272" };
      case "PAGO_REALIZADO":
        return { backgroundColor: "#a98eda" };
      case "PAGO_RECHAZADO":
        return { backgroundColor: "#ea868f" };
      default:
        return {};
    }
  }
  async function getPreferencia() {
    let idMP = await llamarMercadoPago(pedido.id);
    if (idMP != undefined) {
      setPreference(idMP);
      setOpenMercadoPago(!openMercadoPago);
    } else {
      alert("Ocurrio un error al desplegar Mercado Pago");
    }
  }
  function generarBoton() {
    switch (pedido.estado) {
      case "PENDIENTE":
        return (
          <Button
            variant="contained"
            color="error"
            onClick={async () => {await actualizarEstadoPedido(pedido.id,"CANCELADO"); mutador();}}
          >
            Cancelar Pedido
          </Button>
        );
      case "FACTURADO":
        return (
          <a
            href={`https://traza-ending.onrender.com/facturas/${pedido.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="contained" color="warning">
              <Typography sx={{ fontSize: 13 }}>Descargar Factura</Typography>
            </Button>
          </a>
        );
      case "PAGO_RECHAZADO":
        return (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={() => actualizarEstadoPedido(pedido.id,"CANCELADO")}
            >
              Cancelar Pedido
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                getPreferencia();
              }}
            >
              Reintentar Pago
            </Button>
          </>
        );
    }
  }
  return (
    <Accordion sx={colorFondo()}>
      <AccordionSummary expandIcon={<ArrowDropDown />}>
        <Stack direction="row" spacing={1} alignItems={"center"}>
          <Typography>Pedido N°{pedido.id}</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 2, sm: 2, md: 5 }}
        >
          <fieldset>
            <legend>Datos de Facturacion:</legend>
            <Stack>
              <Typography>Metodo de Entrega: {pedido.tipoEnvio}</Typography>
              <Typography>Metodo de Pago: {pedido.formaPago}</Typography>
              <Typography>
                Domicilio:{" "}
                {pedido.domicilio!.calle == null
                  ? "Error"
                  : pedido.domicilio!.calle}{" "}
                {pedido.domicilio!.numero == null
                  ? "Error"
                  : pedido.domicilio!.numero}
              </Typography>
            </Stack>
          </fieldset>
          <fieldset>
            <legend>Datos Cliente</legend>
            <Stack>
              <Typography>
                Nombre:{" "}
                {pedido.cliente!.nombre == null
                  ? "Error"
                  : pedido.cliente!.nombre}
              </Typography>

              <Typography>
                Apellido:{" "}
                {pedido.cliente!.apellido == null
                  ? "Error"
                  : pedido.cliente!.apellido}
              </Typography>

              <Typography>
                Telefono:{" "}
                {pedido.cliente!.telefono == null
                  ? "Error"
                  : pedido.cliente!.telefono}
              </Typography>
            </Stack>
          </fieldset>
          <fieldset>
            <legend>Datos Sucursal</legend>

            <Typography>
              Nombre Sucursal:{" "}
              {pedido.sucursal!.nombre == null
                ? "Error"
                : pedido.sucursal!.nombre}
            </Typography>
            <Typography>
              Direccion:{" "}
              {
                (pedido.sucursal!.domicilio.calle = null
                  ? "Error"
                  : pedido.sucursal!.domicilio.calle)
              }{" "}
              {pedido.sucursal!.domicilio.numero == null
                ? "Error"
                : pedido.sucursal!.domicilio.numero}
            </Typography>
            <Typography>
              Localidad:{" "}
              {pedido.sucursal!.domicilio.localidad.nombre == null
                ? "Error"
                : pedido.sucursal!.domicilio.localidad.nombre}
            </Typography>
            <Typography>
              Provincia:{" "}
              {pedido.sucursal!.domicilio.localidad.provincia.nombre == null
                ? "Error"
                : pedido.sucursal!.domicilio.localidad.provincia.nombre}
            </Typography>
          </fieldset>
          <fieldset>
            <legend>Datos Pedido</legend>
            <Typography>Fecha pedido: {pedido.fechaPedido}</Typography>
            <Typography>Monto Total ${pedido.total}</Typography>
            <Typography>Estado Pedido: {pedido.estado}</Typography>
          </fieldset>
        </Stack>
      </AccordionDetails>
      <AccordionActions>
        <Button variant="contained" color="info">
          <Typography
            sx={{ fontSize: 13 }}
            onClick={() => setOpenModal(!openModal)}
          >
            Productos Pedidos
          </Typography>
        </Button>
        {generarBoton()}
      </AccordionActions>
      <ModalListadoProductos
        open={openModal}
        setOpen={setOpenModal}
        detalles={pedido.detallePedidos}
      />
      <ModalMercadoPago
        open={openMercadoPago}
        preferenceID={preference}
        setOpen={setOpenMercadoPago}
      />
    </Accordion>
  );
}
