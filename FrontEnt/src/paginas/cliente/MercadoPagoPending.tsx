import { Help } from "@mui/icons-material";
import { Box, Container, Paper, Stack, Divider, Typography, Button } from "@mui/material";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";
import { Link } from "react-router-dom";
import { localData } from "../../servicios/FuncionesAPI";

export default function MercadoPagoPending() {
  return (
    <ClienteLayout>
      <Box
        component="div"
        sx={{
          width: "100wh",
          height: "100vh",
          background:
            "linear-gradient(-45deg, rgba(255,255,255,1) 0%, rgba(255,96,0,1) 100%);",
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
                <Help sx={{ fontSize: "130pt" }} color="warning" />
              </Box>
              <Divider />
              <Box component="div">
                <Typography variant="h4" align="center">
                  Tu pago esta tardando demasiado en procesarse
                </Typography>
                <Typography variant="h5" align="center">
                  Si transcurrio bastante tiempo desde que lo pagaste, ponte en contacto con nosotros
                </Typography>
              </Box>
              <Stack direction="row" spacing={2}>
              <Link to={`/cliente/sucursal/${localData.getSucursal("sucursal").id}`} className="btn btn-primary">Regresar a la tienda</Link>
              <Link to={`/cliente/pedidos`} className="btn btn-warning">Ver mis pedidos</Link>
              </Stack>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </ClienteLayout>
  );
}
