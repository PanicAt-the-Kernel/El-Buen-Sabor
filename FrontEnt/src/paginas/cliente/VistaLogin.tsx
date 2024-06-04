import { Button, Container, Paper, Typography } from "@mui/material";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import FormLogin from "../../componentes/ui/cliente/FormLogin";
import { Link } from "react-router-dom";

export default function VistaLogin() {
  return (
    <DashboardLayout>
      <Container>
        <Paper
          elevation={6}
          sx={{ marginTop: 5, maxWidth: 700, marginLeft: 29,padding:3 }}
        >
          <Typography variant="h4" textAlign={"center"}>
            Accede con tu cuenta
          </Typography>
          <FormLogin />
          <Link to="/register" className="btn btn-outline-success mx-4">No tienes una cuenta? Registrate!</Link>
        </Paper>
      </Container>
    </DashboardLayout>
  );
}
