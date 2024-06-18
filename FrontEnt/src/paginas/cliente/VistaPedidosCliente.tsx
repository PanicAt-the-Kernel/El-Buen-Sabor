import { Box, Container, Typography } from "@mui/material";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";
import PedidosContainer from "../../componentes/ui/cliente/vistaListadoPedidos/PedidosContainer";
import { useState } from "react";

export default function VistaPedidosCliente() {
  const [open, setOpen] = useState(false);

  return (
    <ClienteLayout estado={open} setEstado={setOpen}>
      <Box
        component="div"
        sx={{
          backgroundColor: "#282828",
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          marginBottom: 2,
          padding: 2,
        }}
      >
        <Typography variant="h5" color={"white"} textAlign={"center"}>
          Aqui podras ver todos tus pedidos
        </Typography>
      </Box>
      <Container>
        <PedidosContainer />
      </Container>
    </ClienteLayout>
  );
}
