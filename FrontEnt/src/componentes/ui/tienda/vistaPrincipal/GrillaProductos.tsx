import { Grid, Typography } from "@mui/material";
import ItemGrillaProducto from "./ItemGrillaProducto";
import Articulo from "../../../../entidades/Articulo";
import Categoria from "../../../../entidades/Categoria";

interface GrillaProductosProps  {
    categoria: Categoria;
}

export default function GrillaProductos({ categoria }: GrillaProductosProps ) {
    if (categoria.articulos.length === 0) {
        return null;
    }
    return (
        <>
            <Typography variant="h4">
                {categoria.denominacion}
            </Typography>
            <Grid container sx={{ marginTop: 2 }} spacing={1}>
                {categoria.articulos.sort((a: Articulo, b: Articulo) => a.denominacion.localeCompare(b.denominacion))
                    .map((item: Articulo) => (
                        <ItemGrillaProducto
                            key={item.id}
                            item={item}
                        />
                    ))}
            </Grid>
        </>
    );
}
