import { Grid } from "@mui/material";
import { getCategoriasIdSucursal } from "../../../../servicios/vistaInicio/FuncionesAPI";
import Categoria from "../../../../entidades/Categoria";
import GrillaCategoria from "./GrillaCategoria";
/*
interface GrillaProductoTypes {
  busqueda: string;
}
*/
export default function GrillaProducto(/*{ busqueda }: GrillaProductoTypes*/) {
  const idSucursal = 1;
  const { data, isLoading, error } = getCategoriasIdSucursal(idSucursal);
  console.log(data);
  if (error)
    return (
      <>
        <h1>Ups! Ocurrio un error al obtener los menús. Reintente nuevamente en unos minutos</h1>
      </>
    );
  if (isLoading)
    return (
      <>
        <h1>Cargando menús... Muchas gracias por su paciencia.</h1>
      </>
    );

  /*const articulosFiltrados = data?.articulos.filter((item: Articulo) => {
    return (
      busqueda == "" || item.denominacion.toLowerCase().includes(busqueda.toLowerCase())
    );
  }
  );*/

  return (
    <>
      <Grid container sx={{ marginTop: 2 }} spacing={1}>
        {data?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
          .map((item: Categoria) => (
            <GrillaCategoria
              key={item.id}
              idCategoria={data.indexOf(item)+1}
            />
          ))}
      </Grid>
    </>
  );
}
