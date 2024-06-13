import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";
import ListContainerPedido from "../../componentes/ui/cliente/VistaPedidoCliente/ListContainerPedido";
import FormSelectPago from "../../componentes/ui/cliente/VistaPedidoCliente/FormSelectPago";
import FormSelectDomicilio from "../../componentes/ui/cliente/VistaPedidoCliente/FormSelectDomicilio";
import { useState } from "react";

export default function VistaPedidoCliente() {
  const [metodoEntrega, setMetodoEntrega] = useState<string>("DELIVERY");
  const [metodoPago, setMetodoPago] = useState<string>("EFECTIVO");
  const [domicilio, setDomicilio] = useState<number>(0);
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
          <Typography variant="h5" color="white" textAlign="center">
            Revisa tu pedido
          </Typography>
        </Box>
        <Paper
          elevation={5}
          sx={{
            marginTop: 2,
          }}
        >
          <Stack alignItems="center">
            <ListContainerPedido />
            <FormSelectPago
              metodoEntrega={metodoEntrega}
              metodoPago={metodoPago}
              setMetodoEntrega={setMetodoEntrega}
              setMetodoPago={setMetodoPago}
            />
          </Stack>
          <FormSelectDomicilio
            metodoEntrega={metodoEntrega}
            domicilio={domicilio}
            setDomicilio={setDomicilio}
          />
          <Stack direction="row" justifyContent="center">
            <Button
              variant="contained"
              sx={{ color: "white", marginBottom: 2 }}
              color="info"
            >
              Confirmar Pedido
            </Button>
          </Stack>
        </Paper>
      </Container>
    </ClienteLayout>
  );
}
