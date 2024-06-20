import { Container, Paper } from "@mui/material";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";
import FormularioCliente from "../../componentes/ui/cliente/VistaCuentaCliente/FormularioCliente";
import { useState } from "react";

export default function VistaCuentaCliente() {
  const [open, setOpen] = useState(false);

  return (
    <ClienteLayout estado={open} setEstado={setOpen}>
      <Container>
        <Paper elevation={6} sx={{marginTop:2}}>
          <FormularioCliente />
        </Paper>
      </Container>
    </ClienteLayout>
  );
}
