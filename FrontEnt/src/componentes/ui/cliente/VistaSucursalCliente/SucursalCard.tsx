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
import { Link } from "react-router-dom";

interface SucursalCardTypes{
    sucursal:Sucursal;
}

export default function SucursalCard({sucursal}:SucursalCardTypes) {
  return (
    <Card
      sx={{ maxWidth: 300, background: "inherit", border: "1px solid grey" }}
    >
      <CardMedia
        sx={{ height: 150,objectFit:"scale-down" }}
        image="/imgs/sucursal.jpg"
      />
      <CardContent sx={{textAlign:"center"}}>
        <Typography gutterBottom variant="h5" component="div">
          {sucursal.nombre}
        </Typography>
        <Stack>
          <Typography variant="body2" color="text.primary">
            Ubicado en: {sucursal.domicilio.calle} y {sucursal.domicilio.numero}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Horarios: Lunes-Viernes de {sucursal.horarioApertura}-{sucursal.horarioCierre}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack sx={{paddingLeft:5.5}} alignItems="center" justifyContent={"center"}>
          <Link to={`/cliente/sucursal/${sucursal.id}`} className="btn btn-primary">Seleccionar Sucursal</Link>
        </Stack>
      </CardActions>
    </Card>
  );
}
