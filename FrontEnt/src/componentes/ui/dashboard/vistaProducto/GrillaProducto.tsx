import { Grid } from "@mui/material";
import ArticuloManufacturado from "../../../../entidades/ArticuloManufacturado";
import { getAllArticulosManufacturados } from "../../../../servicios/vistaInicio/FuncionesAPI";
import ItemGrillaProducto from "./ItemGrillaProducto";
import BotonEditarGenerico from "../vistaEmpresas/BotonEditarGenerico";
import BotonInfoGenerico from "../vistaEmpresas/BotonInfoGenerico";

interface GrillaProductoTypes {
  busqueda: string;
}

export default function GrillaProducto({ busqueda }: GrillaProductoTypes) {
  const { data: articuloManufacturados } = getAllArticulosManufacturados();

  const artManuFiltrados = articuloManufacturados?.filter(
    (item: ArticuloManufacturado) => {
      return (
        busqueda == "" ||
        item.denominacion.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
  );
  return (
    <Grid container sx={{ marginTop: 2 }} spacing={1}>
      {artManuFiltrados?.map((item: ArticuloManufacturado) => (
        <ItemGrillaProducto
          nombre={item.denominacion}
          urlImagen={item.imagenes[0].url}
          precio={item.precioVenta}
          tiempoCoccion={item.tiempoEstimadoMinutos}
        >
            <BotonEditarGenerico />
            <BotonInfoGenerico />
        </ItemGrillaProducto>
      ))}
    </Grid>
  );
}
