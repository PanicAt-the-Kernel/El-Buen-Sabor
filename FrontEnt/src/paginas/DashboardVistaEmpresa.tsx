import { Grid, Typography } from "@mui/material";
import BuscarEmpresa from "../componentes/ui/dashboard/vistaEmpresas/BuscarEmpresa";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";

function DashboardVistaEmpresa() {
  return (
    <DashboardLayout>
      <Grid container>
        <Grid item xs={12} sm={12} md={4}>
          <Typography variant="h4" sx={{ marginTop: 2, textAlign:"center" }}>
            Lista de Empresas
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <BuscarEmpresa />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
export default DashboardVistaEmpresa;
