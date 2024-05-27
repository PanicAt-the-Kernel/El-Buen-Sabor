import { Grid } from "@mui/material";
import Promocion from "../../../../entidades/Promocion";
import { getAllPromociones } from "../../../../servicios/vistaInicio/FuncionesAPI";
import ItemGrillaPromocion from "./ItemGrillaPromocion";

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
  return(
    <Grid container sx={{marginTop:2}}>
        {promocionesFiltradas?.map((item:Promocion)=>(
            <ItemGrillaPromocion 
                denominacion={item.denominacion}
                descripcion={item.descripcionDescuento}
                fechaDesde={item.fechaDesde}
                fechaHasta={item.fechaHasta}
                horaDesde={item.horaDesde}
                horaHasta={item.horaHasta}
                precio={item.precioPromocional}
            >
                <h1>HOLA</h1>
            </ItemGrillaPromocion>
        ))}
    </Grid>
  )

}
