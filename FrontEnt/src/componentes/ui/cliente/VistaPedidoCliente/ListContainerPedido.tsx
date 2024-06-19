import { List } from "@mui/material";
import ListItemPedido from "./ListItemPedido";

export default function ListContainerPedido() {
  return (
    <List sx={{ maxHeight: 450, overflow: "hidden", overflowY: "scroll" }}>
      <ListItemPedido />
      <ListItemPedido />
      <ListItemPedido />
      <ListItemPedido />
    </List>
  );
}
