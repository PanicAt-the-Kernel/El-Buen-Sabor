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


  const userRoles: string[] = JSON.parse(localStorage.getItem("userRoles") || "[]");
  console.log(userRoles);

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
          <Button style={{ marginRight: '10px' }} size="medium" variant="contained" color="info" startIcon={<Info />} onClick={()=>setOpen(!open)}>
            Mas Datos
          </Button>
          {}
          {((userRoles.includes("ADMINISTRADOR") || userRoles.includes("COCINERO")) && pedidoObj.estado === "PREPARACION" ) 
          && (<Button size="medium" variant="contained" color="primary">
            Listo Para Entregar
          </Button>) }
          {((userRoles.includes("ADMINISTRADOR") || userRoles.includes("CAJERO")) && pedidoObj.estado === "SOLICITADO" ) 
          && (<Button size="medium" variant="contained" color="primary">
            APROBAR
          </Button>) }
          {((userRoles.includes("ADMINISTRADOR") || userRoles.includes("CAJERO")) && pedidoObj.estado === "LISTO PARA ENTREGAR" ) 
          && (<Button size="medium" variant="contained" color="primary">
            ENTREGAR
          </Button>) }
          
          <ModalPedidos open={open} setOpen={setOpen} pedido={pedidoObj}/>
        </Stack>
      </CardActions>
    </Card>
  );
}
