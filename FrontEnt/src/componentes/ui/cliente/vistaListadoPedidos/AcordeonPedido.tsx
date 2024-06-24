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
import { Link } from "react-router-dom";

interface AcordeonPedidoTypes{
  open:boolean;
  setOpen:(item:boolean)=>void;
  pedidoObjeto: Pedido;
}


export default function AcordeonPedido({open,setOpen, pedidoObjeto}:AcordeonPedidoTypes) {
  return (
    <Accordion sx={{ backgroundColor: "#B9E4C9" }}>
      <AccordionSummary expandIcon={<ArrowDropDown />}>
        <Stack direction="row" spacing={1} alignItems={"center"}>
          <Typography>Pedido N°{pedidoObjeto.id}</Typography>
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
              <Typography>Metodo de Entrega: {pedidoObjeto.tipoEnvio}</Typography>
              <Typography>Metodo de Pago: {pedidoObjeto.formaPago}</Typography>
              <Typography>Domicilio: {pedidoObjeto.domicilio.calle}</Typography>
            </Stack>
          </fieldset>
          <fieldset>
            <legend>Datos Cliente</legend>
            <Stack>
              <Typography>Nombre: {pedidoObjeto.cliente.nombre}</Typography>
              <Typography>Apellido: {pedidoObjeto.cliente.apellido}</Typography>
              <Typography>Telefono:{pedidoObjeto.cliente.telefono}</Typography>
            </Stack>
          </fieldset>
          <fieldset>
            <legend>Datos Sucursal</legend>
            <Typography>Nombre Sucursal: {pedidoObjeto.sucursal.nombre}</Typography>
            <Typography>Direccion: {pedidoObjeto.sucursal.domicilio.calle}</Typography>
            <Typography>Localidad: {pedidoObjeto.sucursal.domicilio.localidad.nombre}</Typography>
            <Typography>Provincia: {pedidoObjeto.sucursal.domicilio.localidad.provincia.nombre}</Typography>
          </fieldset>
          <fieldset>
            <legend>Datos Pedido</legend>
            <Typography>Fecha pedido: {pedidoObjeto.fechaPedido}</Typography>
            <Typography>Monto Total {pedidoObjeto.total}</Typography>
            <Typography>Estado Pedido: {pedidoObjeto.estado}</Typography>
          </fieldset>
        </Stack>
      </AccordionDetails>
      <AccordionActions>
        <Button variant="contained" color="info">
          <Typography sx={{fontSize:13}} onClick={()=>setOpen(!open)}>Productos Pedidos</Typography>
        </Button>
        <Link to={`https://traza-final.onrender.com/facturas/${pedidoObjeto.id}`} className="btn btn-warning">
          <Typography sx={{fontSize:13}}>Descargar Factura</Typography>
        </Link>
      </AccordionActions>
    </Accordion>
  );
}
