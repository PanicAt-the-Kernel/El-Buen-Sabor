import { CircularProgress, Grid } from "@mui/material";
import ItemGrilla from "./ItemGrilla";
import { getAllArticulosManufacturados } from "../../../../servicios/vistaInicio/FuncionesAPI";

export default function GrillaProductos() {
  const {data,isLoading,error} = getAllArticulosManufacturados();
  if(error){
    return <h1>Ocurrio un error al cargar</h1>
  }
  if(isLoading){
    return <CircularProgress />
  }
  return (
    <Grid
      container
      spacing={2}
      sx={{ backgroundColor: "#f1f5df", padding: 4, height: 700,overflow:"hidden",overflowY:"scroll"}}
    >
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
    </Grid>
  );
}
