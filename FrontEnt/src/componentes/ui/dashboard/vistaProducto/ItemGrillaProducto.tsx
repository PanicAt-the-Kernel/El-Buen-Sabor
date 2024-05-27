import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Stack,
} from "@mui/material";
import { ReactNode } from "react";

interface ItemGrillaProductoTypes{
    nombre:string;
    urlImagen:string;
    precio:number;
    tiempoCoccion:string;
    children:ReactNode;
}

export default function ItemGrillaProducto({nombre,urlImagen,precio,tiempoCoccion,children}:ItemGrillaProductoTypes) {
  return (
    <Grid item xs={12} sm={12} md={3} sx={{ marginBottom: 2 }}>
      <Card sx={{ maxWidth: 380, textAlign: "center" }}>
        <CardMedia sx={{ height: 260 }} image={urlImagen} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nombre}
          </Typography>
          <Stack direction='row' spacing={2}>
            <Typography>
                Precio de Venta: ${precio}
            </Typography>
            <Typography>
                Tiempo de Coccion: {tiempoCoccion} minutos
            </Typography>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>{children}</CardActions>
      </Card>
    </Grid>
  );
}
