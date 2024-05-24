import { Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";

interface ItemGrillaCategoriaTypes {
  nombre: string; //Nombre de empresa o sucursal
  children: ReactNode;
}
export default function ItemGrillaCategoria({nombre,children}:ItemGrillaCategoriaTypes) {
  return (
    <Grid item xs={12} sm={12} md={3} sx={{ marginBottom: 2 }}>
      <Card sx={{ maxWidth: 380, textAlign: "center" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nombre}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>{children}</CardActions>
      </Card>
    </Grid>
  );
}
