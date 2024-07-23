import {
  Paper,
  Typography,
} from "@mui/material";
import Categoria from "../../../../entidades/Categoria";
import { getCategoriasPadreIdSucursal } from "../../../../servicios/CategoriaService";
import AcordeonCategoria from "./AcordeonCategoria";
import { localSession } from "../../../../servicios/localSession";

interface ListContainerCategoriaTypes {
  busqueda: string;
}

export default function ListContainerCategoria({
  busqueda,
}: ListContainerCategoriaTypes) {
  const { data: categoriasSuc } = getCategoriasPadreIdSucursal(localSession.getSucursal("sucursal").id);
  //const { data: allCategorias } = getAllCategoriasPadre();
  const { data: allCategorias } = getCategoriasPadreIdSucursal(localSession.getSucursal("sucursal").id);

  const categoriasNoSuc = allCategorias?.filter(
    (categoria: Categoria) =>
      !categoriasSuc?.some((catSuc: Categoria) => catSuc.id === categoria.id)
  );

  const categoriasSucFiltradas = categoriasSuc?.filter((item: Categoria) => {
    return (
      busqueda == "" ||
      item.denominacion.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  const categoriasNoSucFiltradas = categoriasNoSuc?.filter(
    (item: Categoria) => {
      return (
        busqueda == "" ||
        item.denominacion.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
  );

  return (
    <>
      <Paper elevation={5} sx={{ marginTop: 2 }}>
        <Typography
          variant="h6"
          sx={{ padding: 2, backgroundColor: "#f5f5f5" }}
        >
          Categorías padre de la sucursal
        </Typography>
        {categoriasSucFiltradas
          ?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
          .map((item: Categoria) => (
            <AcordeonCategoria
              categoria={item}
            />
          ))}
      </Paper>

      <Paper elevation={5} sx={{ marginTop: 2 }}>
        <Typography
          variant="h6"
          sx={{ padding: 2, backgroundColor: "#f5f5f5" }}
        >
          Categorías padre de otras sucursales
        </Typography>

        {categoriasNoSucFiltradas
          ?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
          .map((item: Categoria) => (
            <AcordeonCategoria
              categoria={item}
            />
          ))}
      </Paper>
    </>
  );
}
