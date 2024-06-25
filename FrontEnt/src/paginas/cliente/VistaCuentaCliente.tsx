import { CircularProgress, Container, Paper } from "@mui/material";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";
import FormularioCliente from "../../componentes/ui/cliente/VistaCuentaCliente/FormularioCliente";
import { useAuth0 } from "@auth0/auth0-react";

export default function VistaCuentaCliente() {
  const { user, isLoading: userLoading } = useAuth0();

  if(userLoading){
    return <CircularProgress />
  }
  return (
    <ClienteLayout>
      <Container>
        <Paper elevation={6} sx={{marginTop:2}}>
          <FormularioCliente userEmail={user?.email!}/>
        </Paper>
      </Container>
    </ClienteLayout>
  );
}
