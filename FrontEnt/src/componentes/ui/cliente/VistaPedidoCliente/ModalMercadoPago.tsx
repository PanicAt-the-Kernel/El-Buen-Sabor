import { Container, Modal, Paper, Typography } from "@mui/material";
import CheckOutMP from "../../../../utils/mercadoPago/CheckOutMP";
import PreferenceMP from "../../../../entidades/PreferenceMP";

interface ModalMercadoPagoTypes {
  open: boolean;
  preferenceID: PreferenceMP;
}

export default function ModalMercadoPago({
  open,
  preferenceID,
}: ModalMercadoPagoTypes) {
  if (preferenceID.id == "") {
    return null;
  }
  return (
    <Modal open={open} onClose={() =>{}}>
      <Container>
        <Paper
          elevation={5}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 360,
            maxWidth: "90vw", // Para que la modal no sea demasiado ancha en pantallas pequeñas
            maxHeight: "90vh", // Limitar la altura máxima al 90% de la altura de la ventana
            overflow: "auto", // Hacer que el contenido dentro del Box sea desplazable
          }}
        >
          <Typography variant="h5" align="center">
            Aqui puedes pagar por Mercado Pago
          </Typography>
          <CheckOutMP preferenceID={preferenceID.id} />
        </Paper>
      </Container>
    </Modal>
  );
}
