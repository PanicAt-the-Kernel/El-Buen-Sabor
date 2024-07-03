import {
  Avatar,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper
} from "@mui/material";
import Cliente from "../../../../entidades/Cliente";
import { getAllClientes } from "../../../../servicios/ClienteService";

interface ListContainerClienteTypes {
  busqueda: string;
}

export default function ListContainerCliente({
  busqueda,
}: ListContainerClienteTypes) {
  const { data: clientes, isLoading, error } = getAllClientes();

  if (error) {
    return <h1>Ocurrio un error al obtener los datos</h1>;
  }

  if (isLoading) {
    return <CircularProgress />;
  }
  const clientesFiltrados = clientes?.filter((item: Cliente) => {
    return (
      busqueda == "" ||
      item.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  });
  return (
    <Paper elevation={5}>
      <List>
        {clientesFiltrados
          ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
          .map((item: Cliente) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar src={item.imagenCliente.url}></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Nombre: ${item.nombre} ${item.apellido}`}
                secondary={`UserName: ${item.userName}`}
              />
            </ListItem>
          ))}
      </List>
    </Paper>
  );
}
