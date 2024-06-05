import { Container, Paper, Typography } from "@mui/material";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import FormRegister from "../../componentes/ui/cliente/FormRegister";
import { Link } from "react-router-dom";

export default function VistaRegister() {
  return (
    <DashboardLayout>
      <Container>
        <Paper
          elevation={6}
          sx={{ marginTop: 5, maxWidth: 700, marginLeft: 29, padding: 3 }}
        >
          <Typography variant="h4" textAlign={"center"}>
            Registra Tu Usuario y Cliente
          </Typography>
          <FormRegister />
          <Link to="/login" className="btn btn-outline-success mx-4">Tienes una cuenta? Accede!</Link>
        </Paper>
      </Container>
    </DashboardLayout>
  );
}
