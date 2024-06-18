import { Grid } from "@mui/material";
import ItemGrilla from "./ItemGrilla";
import Articulo from "../../../../entidades/Articulo";
import Categoria from "../../../../entidades/Categoria";

interface GrillaProductosProps {
  categoria: Categoria;
}

export default function GrillaProductos({ categoria }: GrillaProductosProps) {

  if (categoria.articulos.length === 0) {
    return null;
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{ backgroundColor: "#f1f5df", padding: 4, height: 700, overflow: "hidden", overflowY: "scroll" }}
    >
      {categoria.articulos?.sort((a: Articulo, b: Articulo) => a.denominacion.localeCompare(b.denominacion))
        .map((item: Articulo) => (
          <Grid item xs={12} sm={12} md={3}>
            <ItemGrilla
              key={item.id}
              item={item}
            />
          </Grid>
        ))}
    </Grid>
  );
}
