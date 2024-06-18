import { Box, Container, Typography } from "@mui/material";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";
import DomicilioContainer from "../../componentes/ui/cliente/VistaDomiciliosCliente/DomiciliosContainer";
import BotonAgregarDomicilio from "../../componentes/ui/cliente/VistaDomiciliosCliente/BotonAgregarDomicilio";
import { useState } from "react";
import ModalDomicilio from "../../componentes/ui/cliente/VistaDomiciliosCliente/ModalDomicilio";

export default function VistaDomicilioCliente() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ClienteLayout>
      <Container>
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
            Aqui podras ver todos tus domicilios
          </Typography>
        </Box>
        <BotonAgregarDomicilio open={open} setOpen={setOpen} />
        <DomicilioContainer />
        <ModalDomicilio open={open} setOpen={setOpen} />
      </Container>
    </ClienteLayout>
  );
}
