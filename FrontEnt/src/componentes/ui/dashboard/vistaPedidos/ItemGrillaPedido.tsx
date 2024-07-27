import { Info } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Pedido from "../../../../entidades/Pedido";
import { useState } from "react";
import ModalPedidos from "./ModalPedidos";
import { actualizarEstadoPedido } from "../../../../servicios/PedidoService";
import { localSession } from "../../../../servicios/localSession";
import { KeyedMutator } from "swr";


interface ItemGrillaPedidoTypes {
  pedidoObj: Pedido;
  mutador:KeyedMutator<Pedido[]>
}

export default function ItemGrillaPedido({ pedidoObj,mutador }: ItemGrillaPedidoTypes) {
  const [open, setOpen] = useState(false);

  const userRoles: string[] = localSession.getRol("userRoles") || [""];

  return (
    <Card>
      <CardContent>
        <Typography variant="body2" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Fecha Pedido: {pedidoObj.fechaPedido}
        </Typography>
        <Typography variant="h5" component="div">
          Pedido N°: {pedidoObj.id}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Total Pedido: ${pedidoObj.total}
        </Typography>
        <Typography variant="body2">
          Hora Estimada Preparacion: {pedidoObj.horaEstimadaFinalizacion}
        </Typography>
        <Typography>
          Estado Pedido: {pedidoObj.estado}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" alignItems="center">
          <Button style={{ marginRight: '10px' }} size="medium" variant="contained" color="info" startIcon={<Info />} onClick={() => setOpen(!open)}>
            Mas Datos
          </Button>
          {pedidoObj.estado === "PENDIENTE" && (userRoles.includes("ADMIN") || userRoles.includes("CAJERO")) && (
            <ButtonGroup size="medium" variant="contained" color="primary">
              <Button style={{ marginRight: 2 }} onClick={async () => {await actualizarEstadoPedido(pedidoObj.id, "APROBADO"); mutador()}}>
                APROBAR
              </Button>
              <Button onClick={() => actualizarEstadoPedido(pedidoObj.id, "RECHAZADO")}>
                RECHAZAR
              </Button>
            </ButtonGroup>
          )}

          {pedidoObj.estado === "TERMINADO" && (userRoles.includes("ADMIN") || userRoles.includes("CAJERO")) && (
            <ButtonGroup size="medium" variant="contained" color="primary">
              <Button style={{ marginRight: 2 }} onClick={async () => {await actualizarEstadoPedido(pedidoObj.id, "FACTURADO"); mutador()}}>
                FACTURADO
              </Button>
              <Button onClick={() => actualizarEstadoPedido(pedidoObj.id, "DELIVERY")}>
                EN DELIVERY
              </Button>
            </ButtonGroup>
          )}

          {pedidoObj.estado === "DELIVERY" && (userRoles.includes("ADMIN") || userRoles.includes("CAJERO")) && (
            <ButtonGroup size="medium" variant="contained" color="primary">
           <Button size="medium" variant="contained" color="primary" onClick={async () =>  {await actualizarEstadoPedido(pedidoObj.id, "FACTURADO"); mutador()}}>
              Facturar
            </Button>
            <Button onClick={() => actualizarEstadoPedido(pedidoObj.id, "RECHAZADO")}>
              RECHAZAR
            </Button>
          </ButtonGroup>
          )}
          {((userRoles.includes("ADMIN") || userRoles.includes("COCINERO")) && pedidoObj.estado === "APROBADO") && (
             <ButtonGroup size="medium" variant="contained" color="primary">
             <Button style={{ marginRight: 2 }} onClick={async () => {await actualizarEstadoPedido(pedidoObj.id, "TERMINADO"); mutador()}}>
               Listo
             </Button>
             <Button onClick={async () => {await actualizarEstadoPedido(pedidoObj.id, "RECHAZADO"); mutador();}}>
               RECHAZAR
             </Button>
           </ButtonGroup>
          )}

          {pedidoObj.estado === "FACTURADO" && (userRoles.includes("ADMIN") || userRoles.includes("CAJERO")) && (
              <a href={`https://traza-ending.onrender.com/facturas/${pedidoObj.id}`} target="_blank" rel="noopener noreferrer">
              <Button variant="contained" color="warning">
                <Typography sx={{ fontSize: 13 }}>Descargar Factura</Typography>
               </Button>
                </a>
           )}

          <ModalPedidos open={open} setOpen={setOpen} pedido={pedidoObj} />
        </Stack>
      </CardActions>
    </Card>
  );
}
