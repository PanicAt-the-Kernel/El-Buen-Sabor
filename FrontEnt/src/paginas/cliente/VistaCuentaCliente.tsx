import { Container, Paper } from "@mui/material";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";
import FormularioCliente from "../../componentes/ui/cliente/VistaCuentaCliente/FormularioCliente";

export default function VistaCuentaCliente() {
  return (
    <ClienteLayout>
      <Container>
        <Paper elevation={6} sx={{marginTop:2}}>
          <FormularioCliente />
        </Paper>
      </Container>
    </ClienteLayout>
  );
}
