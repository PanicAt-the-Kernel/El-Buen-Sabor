import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Grid,
} from "@mui/material";
import { ReactNode } from "react";

//Item Card para empresa o sucursal

interface ItemGrillaTypes {
  nombre: string; //Nombre de empresa o sucursal
  descripcion: string; //Datos de interes a mostrar de la empresa o sucursal
  children: ReactNode;
  urlImagen:string;
}

export default function ItemGrilla({
  nombre,
  descripcion,
  children,
  urlImagen
}: ItemGrillaTypes) {
  return (
    <Grid item xs={12} sm={12} md={3} sx={{marginBottom:2}}>
      <Card sx={{ maxWidth: 380, textAlign: "center" }}>
        <CardMedia
          sx={{ height: 260}}
          image={urlImagen}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {descripcion}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>{children}</CardActions>
      </Card>
    </Grid>
  );
}
