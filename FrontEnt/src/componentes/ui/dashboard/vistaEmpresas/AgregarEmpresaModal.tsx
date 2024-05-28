import { useState } from "react";
import { Modal, Box, TextField, Stack, Button } from "@mui/material";
import Empresa from "../../../../entidades/Empresa";

interface AgregarEmpresaModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (empresa: Empresa) => void;
  iEmpresa: Empresa;
}

function AgregarEmpresaModal({ open, onClose, onSubmit, iEmpresa }: AgregarEmpresaModalProps) {
  const [empresa, setEmpresa] = useState<Empresa>(iEmpresa);

  const handleSubmit = () => {
    onSubmit(empresa);
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
          minWidth: 325,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          component="form"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Stack spacing={2}>
            <TextField
              required
              label="Nombre"
              variant="outlined"
              value={empresa.nombre}
              onChange={(e) => setEmpresa({ ...empresa, nombre: e.target.value })}
            />
            <TextField
              required
              label="Razón Social"
              variant="outlined"
              value={empresa.razonSocial}
              onChange={(e) => setEmpresa({ ...empresa, razonSocial: e.target.value })}
            />
            <TextField
              required
              label="CUIL"
              variant="outlined"
              value={empresa.cuil}
              onChange={(e) => setEmpresa({ ...empresa, cuil: Number(e.target.value) })}
              type="number"
              inputProps={{
                step: 1,
                min: 1,
                max: 99999999
              }}
            />
            <Button variant="contained" color="primary" type="submit">
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
