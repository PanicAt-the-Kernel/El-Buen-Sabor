import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Stack } from "@mui/material";
import { ReactNode } from "react";

interface ItemGrillaInsumosTypes{
    denominacion:string;
    stockActual:number;
    unidadMedida:string;
    precioCompra:number;
    urlImagen:string;
    children:ReactNode;
}

export default function ItemGrillaInsumos({denominacion,stockActual,urlImagen,precioCompra,children,unidadMedida}:ItemGrillaInsumosTypes){
    return (
        <Grid item xs={12} sm={12} md={3} sx={{marginBottom:2}}>
          <Card sx={{ maxWidth: 380, textAlign: "center" }}>
            <CardMedia
              sx={{ height: 260}}
              image={urlImagen}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {denominacion}
              </Typography>
              <Stack direction="row" spacing={3}>
                <Typography>
                    Stock Actual: {stockActual}
                </Typography>
                <Typography>
                    Precio de Compra: ${precioCompra}
                </Typography>
                <Typography>
                    Unidad Medida: {unidadMedida}
                </Typography>
              </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>{children}</CardActions>
          </Card>
        </Grid>
      );
}