import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  CardActions,
  Button,
} from "@mui/material";
import Sucursal from "../../../../entidades/Sucursal";

interface SucursalCardTypes {
  sucursal: Sucursal;
}

export default function SucursalCard({ sucursal }: SucursalCardTypes) {
  return (
    <Card
      sx={{ maxWidth: 300, background: "inherit", border: "1px solid grey" }}
    >
      <CardMedia
        sx={{ height: 150, objectFit: "scale-down" }}
        image="/imgs/sucursal.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {sucursal.nombre}
        </Typography>
        <Stack>
          <Typography variant="body2" color="text.primary">
          {sucursal.domicilio.calle + " " + sucursal.domicilio.numero + " " + sucursal.domicilio.localidad.nombre}
          </Typography>
          <Typography variant="body2" color="text.primary">
          {"Horarios: " + sucursal.horarioApertura + " a " + sucursal.horarioCierre}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack sx={{ paddingLeft: 3.5 }} alignItems="center">
          <Button size="small" variant="contained" color="info">
            Seleccionar Sucursal
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
