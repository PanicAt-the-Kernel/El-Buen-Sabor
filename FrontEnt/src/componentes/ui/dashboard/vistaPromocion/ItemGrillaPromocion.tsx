import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

interface ItemGrillaPromocion {
  denominacion: string;
  descripcion: string;
  fechaDesde: string;
  fechaHasta: string;
  horaDesde: string;
  horaHasta: string;
  precio: number;
  children: ReactNode;
}

export default function ItemGrillaPromocion({
  denominacion,
  descripcion,
  fechaDesde,
  fechaHasta,
  horaDesde,
  horaHasta,
  precio,
  children,
}: ItemGrillaPromocion) {

  fechaDesde=new Date(fechaDesde).toLocaleString("es-ar").substring(0,10);
  fechaHasta = new Date(fechaHasta).toLocaleString("es-ar").substring(0,10);
  return (
    <Grid item xs={12} sm={12} md={3} sx={{ marginBottom: 2 }}>
      <Card sx={{ maxWidth: 380 }}>
        <CardMedia
          sx={{ height: 190, margin: 1 }}
          image={
            "https://sdi-implant.com/wp-content/uploads/2018/02/placeholder-black.png"
          }
        />
        <CardContent>
          <Typography color="text.secondary">
            {fechaDesde} - {fechaHasta}
          </Typography>
          <Typography variant="h6" component="div">
            {denominacion}
          </Typography>
          <Stack direction="column" spacing={1} sx={{ marginBottom: 3 }}>
            <Typography color="text.secondary">{descripcion}</Typography>
          </Stack>
          <Stack direction="column">
            <Typography variant="body1">Precio Especial: ${precio}</Typography>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>{children}</CardActions>
      </Card>
    </Grid>
  );
}
