import { Box } from "@mui/material";
import TiendaLayout from "../../layouts/tienda/TiendaLayout";
import BuscarProducto from "../../componentes/ui/tienda/vistaPrincipal/BuscarProducto";
import { useState } from "react";
import { CarritoProvider } from "../../context/CarritoContext";
import SidebarCarrito from "../../componentes/ui/tienda/vistaPrincipal/SidebarCarrito";

function TiendaVistaPrincipal() {
  const [open, setOpen] = useState(false);

  return (
    <Box component="div">
      <CarritoProvider>
        <TiendaLayout estado={open} setEstado={setOpen}>
          <BuscarProducto />
        </TiendaLayout>
        <SidebarCarrito estado={open} setEstado={setOpen} />
      </CarritoProvider>
    </Box>
  );
}
export default TiendaVistaPrincipal;
