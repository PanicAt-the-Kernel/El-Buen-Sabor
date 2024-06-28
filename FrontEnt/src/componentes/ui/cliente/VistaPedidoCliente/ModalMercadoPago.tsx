import { Container, Modal, Paper, Typography } from "@mui/material";
import CheckOutMP from "../../../../utils/mercadoPago/CheckOutMP";
import PreferenceMP from "../../../../entidades/PreferenceMP";

interface ModalMercadoPagoTypes {
  open: boolean;
  setOpen: (item: boolean) => void;
  preferenceID: PreferenceMP;
}

export default function ModalMercadoPago({
  open,
  setOpen,
  preferenceID,
}: ModalMercadoPagoTypes) {
  if (preferenceID.id=="") {
    return null;
  }
  return (
    <Modal open={open} onClose={() => setOpen(!open)}>
      <Container>
        <Paper elevation={5}>
          <Typography variant="h5" align="center">
            Aqui puedes pagar por Mercado Pago
          </Typography>
          <CheckOutMP preferenceID={preferenceID.id} />
        </Paper>
      </Container>
    </Modal>
  );
}
