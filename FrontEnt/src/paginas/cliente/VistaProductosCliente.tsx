import { useParams } from "react-router-dom";
import TabsCategorias from "../../componentes/ui/cliente/vistaPrincipal/TabCategorias";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";
import { getSucursalId } from "../../servicios/vistaInicio/FuncionesAPI";
import { Container } from "@mui/material";

export default function VistaProductosCliente() {
  const { id } = useParams();
  const { data: sucursal, isLoading, error } = getSucursalId(Number(id));

  if (error) {
  }

  if (isLoading) {
  }

  return (
    <ClienteLayout>
      <Container>
        <TabsCategorias />
      </Container>
    </ClienteLayout>
  );
}
