import { Grid, Typography } from "@mui/material";
import DashboardSidebar from "../../layouts/dashboard/DashboardSidebar";
import BuscarCliente from "../../componentes/ui/dashboard/vistaClientes/BuscarCliente";

export default function DashboardVistaClientes() {
  return (
    <DashboardSidebar>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{ marginTop: 2, textAlign: "center" }}
        >
          <Typography variant="h5">Lista de Clientes</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <BuscarCliente />
        </Grid>
      </Grid>
    </DashboardSidebar>
  );
}
