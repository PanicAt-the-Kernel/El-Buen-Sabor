import { CircularProgress, Grid } from "@mui/material";
import { getCategoriasIdSucursal } from "../../../../servicios/vistaInicio/FuncionesAPI";
import Categoria from "../../../../entidades/Categoria";
import GrillaProductos from "./GrillaProductos";

export default function GrillaCategorias() {
  const idSucursal = 1;
  const { data, isLoading, error } = getCategoriasIdSucursal(idSucursal);

  if (error)
    return (
      <>
        <h1>Ups! Ocurrio un error al obtener los menús. Reintente nuevamente en unos minutos</h1>
      </>
    );
  if (isLoading)
    return (
      <>
         <CircularProgress color="inherit"/>
      </>
    );
  
  const categoriasFiltradas = data?.filter(categoria => categoria.denominacion !== 'Insumos' /*&& categoria.id !== 5*/);

  return (
    <>
      <Grid container sx={{ marginTop: 2 }} spacing={1}>
        {categoriasFiltradas?.map((item: Categoria) => (
          <GrillaProductos
            key={item.id}
            categoria={item}
          />
        ))}
      </Grid>
    </>
  );
}
