import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

interface ItemListTypes {
  nombre: string;
  cargo: string;
}

export default function ItemList({ nombre, cargo }: ItemListTypes) {
  function stringAvatar(name: string) {
    //Genera las iniciales segun el nombre
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="Editar">
            <Edit />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar {...stringAvatar(nombre)} />
        </ListItemAvatar>
        <ListItemText
          primary={nombre}
          secondary={`Cargo: ${cargo}`}
        ></ListItemText>
      </ListItem>
      <Divider />
    </>
  );
}
