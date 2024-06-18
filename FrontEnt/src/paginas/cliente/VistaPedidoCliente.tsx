import { useState } from "react";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";

export default function VistaPedidoCliente(){
    const [open, setOpen] = useState(false);

    <ClienteLayout estado={open} setEstado={setOpen}>
        <h1></h1>
    </ClienteLayout>
}