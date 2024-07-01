import { useParams } from "react-router-dom";
import { useState } from "react";
import TabsCategorias from "../../componentes/ui/cliente/vistaPrincipal/TabCategorias";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";
import SidebarCarrito from "../../componentes/ui/cliente/vistaPrincipal/SidebarCarrito";
import { getSucursalId } from "../../servicios/SucursalService";
import { CircularProgress, Container } from "@mui/material";
import { localSession } from "../../servicios/localSession";

export default function VistaProductosCliente() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { data: sucursal, isLoading, error } = getSucursalId(Number(id));
  if (error) {
    return <h1>Ocurrio un error al cargar la informacion</h1>;
  }
  if (isLoading) {
    return <CircularProgress />;
  }
  localSession.setSucursal("sucursal", sucursal!);
  return (
    <>
      <ClienteLayout estado={open} setEstado={setOpen}>
        <Container>
          <TabsCategorias />
        </Container>
      </ClienteLayout>
      <SidebarCarrito estado={open} setEstado={setOpen} />
    </>
  );
}
