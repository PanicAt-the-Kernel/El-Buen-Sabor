import { List, Paper } from "@mui/material";
import ItemList from "./ItemList";

interface ListContainerEmpleadoTypes {
  busqueda: string;
}

export default function ListContainerEmpleado({
  busqueda,
}: ListContainerEmpleadoTypes) {
  const employees = [
    { id: 1, name: "Juan Pérez", position: "Cocinero" },
    { id: 2, name: "Ana Gómez", position: "Gerente" },
    { id: 3, name: "Luis Martínez", position: "Mozo" },
    { id: 4, name: "Carlos López", position: "Cajero" },
    { id: 5, name: "Marta Fernández", position: "Repostera" },
    { id: 6, name: "Julia Ramírez", position: "Mozo" },
    { id: 7, name: "Pedro González", position: "Mozo" },
    { id: 8, name: "María Torres", position: "Mozo" },
    { id: 9, name: "Juan García", position: "Mozo" },
    { id: 10, name: "Laura López", position: "Mozo" },
    { id: 11, name: "Diego Fernández", position: "Mozo" },
  ];

  const empleadosFiltrados = employees?.filter((item) => {
    return (
      busqueda == "" || item.name.toLowerCase().includes(busqueda.toLowerCase())
    );
  });
  return (
    <Paper elevation={5} sx={{marginTop:2}}>
      <List sx={{ backgroundColor: "white", overflow: 'auto', maxHeight: 700 }}>
        {empleadosFiltrados.map((item) => (
          <ItemList nombre={item.name} cargo={item.position} />
        ))}
      </List>
    </Paper>
  );
}
