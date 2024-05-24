import { Grid } from "@mui/material";
import ArticuloInsumo from "../../../../entidades/ArticuloInsumo";
import { getAllInsumos } from "../../../../servicios/vistaInicio/FuncionesAPI";
import BotonEditarGenerico from "../vistaEmpresas/BotonEditarGenerico";
import BotonInfoGenerico from "../vistaEmpresas/BotonInfoGenerico";
import ItemGrillaInsumos from "./ItemGrillaInsumos";

interface GrillaProps {
  busqueda: string;
}
export default function GrillaInsumos({ busqueda }: GrillaProps) {
  const { data: insumos } = getAllInsumos();

  const insumosFiltrados = insumos?.filter((item: ArticuloInsumo) => {
    return (
      busqueda === "" ||
      item.denominacion.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  return (
    <Grid container sx={{ marginTop: 2}} spacing={1}>
      {insumosFiltrados?.map((item: ArticuloInsumo) => (
        <ItemGrillaInsumos
          denominacion={item.denominacion}
          stockActual={item.stockActual}
          unidadMedida={item.unidadMedida.denominacion}
          precioCompra={item.precioCompra}
          urlImagen={item.imagenes[0].url}
        >
          <BotonEditarGenerico />
          <BotonInfoGenerico />
        </ItemGrillaInsumos>
      ))}
    </Grid>
  );
}
