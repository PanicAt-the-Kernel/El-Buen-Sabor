import { List } from "@mui/material";
import ListItemPedido from "./ListItemPedido";
import DetallePedido from "../../../../entidades/DetallePedido";

interface ListContainerPedidoTypes{
  carrito:DetallePedido[];
}

export default function ListContainerPedido({carrito}:ListContainerPedidoTypes) {
  return (
    <List sx={{ maxHeight: 450, overflow: "hidden", overflowY: "scroll" }}>
      {carrito.map((item:DetallePedido,index:number)=>(
        <ListItemPedido key={index} objeto={item} />
      ))}

    </List>
  );
}
