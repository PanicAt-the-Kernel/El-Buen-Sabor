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
import { cancelarPedido } from "../../../../servicios/PedidoService";

interface AcordeonPedidoTypes {
  pedido: Pedido;
}

export default function AcordeonPedido({ pedido }: AcordeonPedidoTypes) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  function colorFondo(){
    switch(pedido.estado){
      case "PENDIENTE": return {backgroundColor: "#ffe69c"};
      case "CANCELADO": return {backgroundColor: "#ea868f" };
      case "RECHAZADO": return {backgroundColor: "#ea868f" };
      case "TERMINADO": return {backgroundColor: "#75b798"};
      case "DELIVERY": return {backgroundColor: "#6ea8fe"};
      case "APROBADO": return {backgroundColor: "#79dfc1"};
      case "FACTURADO": return {backgroundColor: "#feb272"};
      default: return {};

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
                {/*@ts-ignore */}
                Domicilio: {pedido.domicilio.calle == null ? "Error" : pedido.domicilio.calle} {pedido.domicilio.numero == null ? "Error" : pedido.domicilio.numero}
              </Typography>
            </Stack>
          </fieldset>
          <fieldset>
            <legend>Datos Cliente</legend>
            <Stack>
              {/*@ts-ignore */}
              <Typography>Nombre: {pedido.cliente.nombre == null ? "Error" : pedido.cliente.nombre }</Typography>
              {/*@ts-ignore */}
              <Typography>Apellido: {pedido.cliente.apellido == null ? "Error" : pedido.cliente.apellido}</Typography>
              {/*@ts-ignore */}
              <Typography>Telefono: {pedido.cliente.telefono == null ? "Error" : pedido.cliente.telefono}</Typography>
            </Stack>
          </fieldset>
          <fieldset>
            <legend>Datos Sucursal</legend>
            {/*@ts-ignore */}
            <Typography>Nombre Sucursal: {pedido.sucursal.nombre == null ? "Error" : pedido.sucursal.nombre}</Typography>
            <Typography>
              {/*@ts-ignore */}
              Direccion: {pedido.sucursal.domicilio.calle = null ? "Error" : pedido.sucursal.domicilio.calle} {pedido.sucursal.domicilio.numero == null ? "Error" : pedido.sucursal.domicilio.numero}
            </Typography>
            <Typography>
              {/*@ts-ignore */}
              Localidad: {pedido.sucursal.domicilio.localidad.nombre == null ? "Error" : pedido.sucursal.domicilio.localidad.nombre}
            </Typography>
            <Typography>
              {/*@ts-ignore */}
              Provincia: {pedido.sucursal.domicilio.localidad.provincia.nombre == null ? "Error" : pedido.sucursal.domicilio.localidad.provincia.nombre}
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
        {pedido.estado == "FACTURADO" && (
          <a
            href={`https://back-magni-0zhl.onrender.com/facturas/${pedido.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="contained" color="warning">
              <Typography sx={{ fontSize: 13 }}>Descargar Factura</Typography>
            </Button>
          </a>
        )}
        {pedido.estado == "PENDIENTE" && (
          <Button
            variant="contained"
            color="error"
            onClick={() => cancelarPedido(pedido.id)}
          >
            Cancelar Pedido
          </Button>
        )}
      </AccordionActions>
      <ModalListadoProductos
        open={openModal}
        setOpen={setOpenModal}
        detalles={pedido.detallePedidos}
      />
    </Accordion>
  );
}
