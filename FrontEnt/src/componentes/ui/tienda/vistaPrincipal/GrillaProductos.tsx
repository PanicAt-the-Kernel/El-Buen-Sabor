import { Grid, Typography } from "@mui/material";
import { getCategoriaId } from "../../../../servicios/vistaInicio/FuncionesAPI";
import ItemGrillaProducto from "./ItemGrillaProducto";
import Articulo from "../../../../entidades/Articulo";

interface GrillaCategoriaProps  {
    idCategoria: number;
}

export default function GrillaCategoria({ idCategoria }: GrillaCategoriaProps ) {
    const { data, isLoading, error } = getCategoriaId(idCategoria);

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

    if (!data?.articulos || data.articulos.length === 0) {
        return null;
    }
    return (
        <>
            <Typography variant="h4">
                {data?.denominacion}
            </Typography>
            <Grid container sx={{ marginTop: 2 }} spacing={1}>
                {data.articulos.sort((a: Articulo, b: Articulo) => a.denominacion.localeCompare(b.denominacion))
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
