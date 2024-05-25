import { Paper, List } from "@mui/material";
import Categoria from "../../../../entidades/Categoria";
import { getAllCategorias } from "../../../../servicios/vistaInicio/FuncionesAPI";
import ItemListCategoria from "./ItemListCategoria";

interface ListContainerCategoriaTypes{
    busqueda:string;
}

export default function ListContainerCategoria({busqueda}:ListContainerCategoriaTypes){
    const { data: categorias } = getAllCategorias();

  const categoriasFiltradas = categorias?.filter((item: Categoria) => {
    return (
      busqueda == "" ||
      item.denominacion.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  return(
    <Paper elevation={5} sx={{marginTop:2}}>
      <List sx={{ backgroundColor: "white" }}>
        {categoriasFiltradas?.map((item:Categoria) => (
          <ItemListCategoria denominacion={item.denominacion} />
        ))}
      </List>
    </Paper>
  )
}