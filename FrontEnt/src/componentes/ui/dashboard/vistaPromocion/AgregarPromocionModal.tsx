import { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import Promocion from "../../../../entidades/Promocion";

interface AgregarPromocionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  iPromocion: Promocion;
}

function AgregarPromocionModal({
  open,
  onClose,
  onSubmit,
  iPromocion,
}: AgregarPromocionModalProps) {
  const [promocion, setNombre] = useState<Promocion>(iPromocion);

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" id="modal-title" gutterBottom>
          Agregar Nueva Promocion
        </Typography>
        <Stack spacing={2}>
          <TextField
            required
            label="Nombre"
            variant="outlined"
            value={promocion.denominacion}
            onChange={(e) => {
              promocion.denominacion = e.target.value;
            }}
          />
          <TextField
            label="Descripcion"
            required
            variant="outlined"
            value={promocion.descripcionDescuento}
            onChange={(e) => (promocion.descripcionDescuento = e.target.value)}
          />
          <TextField
            label="Precio"
            required
            variant="outlined"
            type="number"
            value={promocion.precioPromocional}
            onChange={(e) =>
              (promocion.precioPromocional = Number(e.target.value))
            }
            inputProps={{
              step: 0.01,
              min: 0,
            }}
          />
          <TextField
            label="Fecha desde"
            required
            type="date"
            variant="outlined"
            value={promocion.fechaDesde}
            onChange={(e) => (promocion.fechaDesde = e.target.value)}
          />
          <TextField
            label="Fecha hasta"
            required
            variant="outlined"
            type="date"
            value={promocion.fechaHasta}
            onChange={(e) => (promocion.horaHasta = e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Guardar
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default AgregarPromocionModal;
