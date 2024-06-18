import { CheckCircle } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import ClienteLayout from "../../layouts/cliente/ClienteLayout";

export default function MercadoPagoSuccess() {
  return (
    <ClienteLayout>
      <Box
      component="div"
      sx={{
        width: "100wh",
        height: "100vh",
        backgroundImage: "url(/imgs/patronComida.jpg)",
        backgroundSize: "auto",
      }}
    ></Box>
      <Stack
        direction={{ xs: "column", sm: "column" }}
        spacing={2}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{marginTop:"15vh"}}

      >
        <Box component="div">
          <CheckCircle sx={{ fontSize: "140pt" }} color="success"/>
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
        <Button variant="contained" color="info">Regresar a la tienda</Button>
      </Stack>
    </ClienteLayout>
  );
}
