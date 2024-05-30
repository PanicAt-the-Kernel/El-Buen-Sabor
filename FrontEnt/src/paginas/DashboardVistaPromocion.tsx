import { Grid, Typography } from "@mui/material";
import BuscarPromocion from "../componentes/ui/dashboard/vistaPromocion/BuscarPromocion";
import DashboardSidebar from "../layouts/dashboard/DashboardSidebar";

function DashboardVistaPromocion() {
<<<<<<< HEAD
  return (
    <DashboardSidebar>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} sx={{marginTop:2, textAlign:"center"}}>
          <Typography variant="h5">Lista de Promociones</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <BuscarPromocion />
        </Grid>
      </Grid>
    </DashboardSidebar>
  );
=======
    return (
        <DashboardSidebar>
            <p></p>
            <h2>Lista de Promociones</h2>
            <BuscarPromocion />
        </DashboardSidebar>
    )
>>>>>>> ce2812ab8f11319ea2d17e7cfc8c9585a3a122bb
}
export default DashboardVistaPromocion;
