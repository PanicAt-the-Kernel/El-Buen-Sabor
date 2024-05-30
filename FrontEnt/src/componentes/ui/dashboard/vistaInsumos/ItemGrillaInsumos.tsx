import { Grid, Card, CardMedia, CardContent, Typography, CardActions } from "@mui/material";
import { ReactNode } from "react";

interface ItemGrillaInsumosTypes{
    denominacion:string;
    stockActual:string;
    precioCompra:string;
    urlImagen:string;
    children:ReactNode;
}

export default function ItemGrillaInsumos({denominacion,stockActual,urlImagen,precioCompra,children}:ItemGrillaInsumosTypes){
    return (
      <Grid item sx={{marginBottom:2}}>
      <Card sx={{ width: 230, textAlign: "center" }}>
        <CardMedia
          sx={{ height: 150, margin: 1}}
          image={urlImagen}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {denominacion}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {stockActual}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {precioCompra}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>{children}</CardActions>
      </Card>
    </Grid>
      );
}