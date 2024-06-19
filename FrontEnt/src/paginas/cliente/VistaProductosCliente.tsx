import { useParams } from "react-router-dom";
import { useState } from "react";
import TabsCategorias from "../../componentes/ui/cliente/vistaPrincipal/TabCategorias";
import { CarritoProvider } from "../../context/CarritoContext";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";
import SidebarCarrito from "../../componentes/ui/cliente/vistaPrincipal/SidebarCarrito";
import { getSucursalId } from "../../servicios/vistaInicio/FuncionesAPI";
import { Container } from "@mui/material";

export default function VistaProductosCliente() {
    const [open, setOpen] = useState(false);

    return (
        <CarritoProvider>
            <ClienteLayout estado={open} setEstado={setOpen}>
                <TabsCategorias />
            </ClienteLayout>
            <SidebarCarrito estado={open} setEstado={setOpen} />
        </CarritoProvider>

    )
}
