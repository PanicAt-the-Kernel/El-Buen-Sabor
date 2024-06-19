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
import { editPedido } from "../../../../servicios/vistaInicio/FuncionesAPI";
import Estado from "../../../../entidades/Estado";

interface ItemGrillaPedidoTypes{
    pedidoObj:Pedido;
}

export default function ItemGrillaPedido({pedidoObj}:ItemGrillaPedidoTypes) {
  const [open,setOpen] = useState(false);

  const userRoles: string[] = JSON.parse(localStorage.getItem("userRoles") || "[]");
  console.log(userRoles);
  let estado1: Estado = new Estado();
  let estado2: Estado = new Estado();
  let estado3: Estado = new Estado();

  estado1.nombre="PENDIENTE";
  estado2.nombre="ENTREGADO";
  estado3.nombre="RECHAZADO";


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
          && (<Button size="medium" variant="contained" color="primary" onClick={() => editPedido(pedidoObj.id, estado1)}>
            Listo
          </Button>) }
          {((userRoles.includes("ADMINISTRADOR") || userRoles.includes("CAJERO")) && pedidoObj.estado === "PENDIENTE" ) 
          && (<Button size="medium" variant="contained" color="primary" onClick={() => editPedido(pedidoObj.id, estado2)}>
            Entregar
          </Button>) }
          {((userRoles.includes("ADMINISTRADOR") || userRoles.includes("CAJERO")) && pedidoObj.estado === "ENTREGADO" ) 
          && (<Button size="medium" variant="contained" color="primary" onClick={() => editPedido(pedidoObj.id, estado3)} >
            Facturar
          </Button>) }
          
          <ModalPedidos open={open} setOpen={setOpen} pedido={pedidoObj}/>
        </Stack>
      </CardActions>
    </Card>
  );
}
