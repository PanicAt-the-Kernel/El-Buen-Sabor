import { Button, Grid } from "@mui/material";
import Promocion from "../../../../entidades/Promocion";
import { getAllPromociones } from "../../../../servicios/vistaInicio/FuncionesAPI";
import ItemGrillaPromocion from "./ItemGrillaPromocion";
import { Info, Edit } from "@mui/icons-material";

interface GrillaPromocionTypes {
  busqueda: string;
}

export default function GrillaPromocion({ busqueda }: GrillaPromocionTypes) {
  const { data: promociones } = getAllPromociones();
  const promocionesFiltradas = promociones?.filter((item: Promocion) => {
    return (
      busqueda === "" ||
      item.denominacion.toLowerCase().includes(busqueda.toLowerCase())
    );
  });
  return (
    <Grid container sx={{ marginTop: 2 }} spacing={2}>
      {promocionesFiltradas?.map((item: Promocion) => (
        <ItemGrillaPromocion
          denominacion={item.denominacion}
          descripcion={item.descripcionDescuento}
          fechaDesde={item.fechaDesde}
          fechaHasta={item.fechaHasta}
          horaDesde={item.horaDesde}
          horaHasta={item.horaHasta}
          precio={item.precioPromocional}
        >
          <Button size="small" variant="contained" color="info" startIcon={<Info />} /*onClick={() => handleOpenInfo(item)}*/>Info</Button>
          <Button size="small" variant="contained" startIcon={<Edit />} /*onClick={() => handleOpenEditar(item)}*/>Editar</Button>
        </ItemGrillaPromocion>
      ))}
    </Grid>
  );
}
