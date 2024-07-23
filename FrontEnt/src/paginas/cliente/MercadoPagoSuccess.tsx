import { CheckCircle } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";
import { Link, useParams } from "react-router-dom";
import { localSession } from "../../servicios/localSession";
import { actualizarEstadoPago } from "../../servicios/PedidoService";
import { useEffect } from "react";

export default function MercadoPagoSuccess() {
  const {id}=useParams();
  useEffect(()=>{
    actualizarEstadoPago(Number(id),"PAGO_REALIZADO");
  })
  
  return (
    <ClienteLayout>
      <Box
        component="div"
        sx={{
          width: "100wh",
          height: "100vh",
          background:
            "linear-gradient(-45deg, rgba(255,255,255,1) 0%, rgba(42,213,85,1) 100%);",
        }}
      >
        <Container sx={{ padding: 2 }}>
          <Paper
            elevation={5}
            sx={{
              background: "rgba(255,255,255,0.48)",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              padding: 3,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "column" }}
              spacing={2}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Box component="div">
                <CheckCircle sx={{ fontSize: "130pt" }} color="success" />
              </Box>
              <Divider />
              <Box component="div">
                <Typography variant="h4" align="center">
                  Tu pago ha sido procesado con exito
                </Typography>
                <Typography variant="h5" align="center">
                  Disfruta de tu compra!
                </Typography>
              </Box>
              <Link
                to={`/cliente/sucursal/${
                  localSession.getSucursal("sucursal").id
                }`}
                className="btn btn-primary"
              >
                Regresar a la tienda
              </Link>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </ClienteLayout>
  );
}
