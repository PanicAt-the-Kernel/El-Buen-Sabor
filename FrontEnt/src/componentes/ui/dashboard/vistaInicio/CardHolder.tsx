import { Box, Grid, Paper } from "@mui/material";
import CardMUI from "./CardMUI";

function CardHolder() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={8}>
          <Box component="div">
            <CardMUI
              titulo={"Sucursales"}
              imgURL={"/imgs/sucursal.jpg"}
              descripcion={"Gestione rapidamente las sucursales de la empresa"}
              url={"/empesa"}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={8}>
          <Box component="div">
            <CardMUI
              titulo={"Productos"}
              imgURL={"/imgs/productos.jpg"}
              descripcion={"Gestione rapidamente los productos vendidos"}
              url={"/productos"}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={8}>
          <Box component="div">
            <CardMUI
              titulo={"Insumos"}
              imgURL={"/imgs/insumos.jpg"}
              descripcion={"Gestione rapidamente los insumos de las sucursales"}
              url={"/empesa"}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={8}>
          <Box component="div">
            <CardMUI
              titulo="Empleados"
              imgURL="/imgs/empleados.jpg"
              descripcion="Gestione rapidamente los empleados de las sucursales"
              url="/empleados"
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default CardHolder;
