import { Info } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Pedido from "../../../../entidades/Pedido";
import { useState } from "react";
import ModalPedidos from "./ModalPedidos";

interface ItemGrillaPedidoTypes{
    pedidoObj:Pedido;
}

export default function ItemGrillaPedido({pedidoObj}:ItemGrillaPedidoTypes) {
  const [open,setOpen] = useState(false);
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
          <Button size="medium" variant="contained" color="info" startIcon={<Info />} onClick={()=>setOpen(!open)}>
            Mas Datos
          </Button>
          <ModalPedidos open={open} setOpen={setOpen} pedido={pedidoObj}/>
        </Stack>
      </CardActions>
    </Card>
  );
}
