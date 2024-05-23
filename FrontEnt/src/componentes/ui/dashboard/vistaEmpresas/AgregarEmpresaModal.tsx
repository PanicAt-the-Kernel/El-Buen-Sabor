import { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Typography,
  Stack,
  Button,
} from "@mui/material";

interface AgregarEmpresaModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (nombre: string, razonSocial: string, cuil: string) => void;
  initialNombre: string;
  initialRazonSocial: string;
  initialCuil: string;
}

function AgregarEmpresaModal({
  open,
  onClose,
  onSubmit,
  initialNombre,
  initialRazonSocial,
  initialCuil,
}: AgregarEmpresaModalProps) {
  const [nombre, setNombre] = useState(initialNombre);
  const [razonSocial, setRazonSocial] = useState(initialRazonSocial);
  const [cuil, setCuil] = useState(initialCuil);

  const handleSubmit = () => {
    //ENVIAR DATOS DEL FORMULARIO
    onSubmit(nombre, razonSocial, cuil);
    //LIMPIAR CAMPOS FORMULARIO 
    setNombre('');
    setRazonSocial('');
    setCuil('');
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
          Agregar Nueva Empresa
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          autoComplete="off"
        >
          <Stack spacing={2}>
            <TextField
              required
              label="Nombre"
              variant="outlined"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <TextField
              required
              label="Razón Social"
              variant="outlined"
              value={razonSocial}
              onChange={(e) => setRazonSocial(e.target.value)}
            />
            <TextField
              required
              label="CUIL"
              variant="outlined"
              value={cuil}
              onChange={(e) => setCuil(e.target.value)}
              inputProps={{
                step:1,
                min:1,
                max:99999999
              }}
            />
            <Button variant="contained" color="primary" type='submit'>
              Guardar
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}

export default AgregarEmpresaModal;
