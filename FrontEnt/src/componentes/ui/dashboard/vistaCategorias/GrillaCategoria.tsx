import { Grid } from "@mui/material";
import { getAllCategorias} from "../../../../servicios/vistaInicio/FuncionesAPI";
import Categoria from "../../../../entidades/Categoria";
import BotonEditarGenerico from "../vistaEmpresas/BotonEditarGenerico";
import BotonInfoGenerico from "../vistaEmpresas/BotonInfoGenerico";
import ItemGrillaCategoria from "./ItemGrillaCategoria";

interface GrillaProps {
  busqueda: string;
}

export default function Grilla({ busqueda }: GrillaProps) {
  const { data: categorias } = getAllCategorias();

  const categoriasFiltradas = categorias?.filter((item: Categoria) => {
    return (
      busqueda === "" ||
      item.denominacion.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  return (
    <Grid container sx={{ marginTop: 2}} spacing={1}>
      {categoriasFiltradas?.map((item: Categoria) => (
        <ItemGrillaCategoria
          nombre={item.denominacion}
        >
          <BotonEditarGenerico />
          <BotonInfoGenerico />
        </ItemGrillaCategoria>
      ))}
    </Grid>
  );
}