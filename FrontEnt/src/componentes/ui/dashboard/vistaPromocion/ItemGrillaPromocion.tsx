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
  return (
    <Grid item xs={12} sm={12} md={3} sx={{ marginBottom: 2 }}>
      <Card sx={{ maxWidth: 380, textAlign: "center" }}>
        <CardMedia sx={{ height: 260 }} image={""} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {denominacion}
          </Typography>
          <Stack direction="column" spacing={1}>
          <Typography variant="body2" color="text.secondary">
            {descripcion}
          </Typography>
          <Typography variant="body2">
            Promo Valida desde {fechaDesde}/{horaDesde} hasta {fechaHasta}/{horaHasta}
          </Typography>
          <Divider sx={{opacity:1, color:"black",border:1}}/>
          <Stack direction="column">
            <Typography variant="body2">
                Precio Especial:${precio}
            </Typography>
          </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>{children}</CardActions>
      </Card>
    </Grid>
  );
}
