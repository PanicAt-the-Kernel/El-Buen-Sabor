import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";

interface ModalDomicilioTypes {
  open: boolean;
  setOpen: (item: boolean) => void;
}

export default function ModalDomicilio({ open, setOpen }: ModalDomicilioTypes) {
  const [check, setChecked] = useState<boolean>(false);
  const onSubmit =(e:SyntheticEvent)=>{
    e.preventDefault();
    alert("Formulario Enviado")
  }
  return (
    <Modal open={open} onClose={() => setOpen(!open)}>
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
        <Box component="form" autoComplete="off" onSubmit={(e)=>onSubmit(e)}>
          <Typography variant="h4" sx={{marginBottom:1}}>Agregar un nuevo domicilio</Typography>
          <Stack spacing={2}>
            <TextField label="Calle" required/>
            <TextField label="Numero" required/>
            <TextField label="Codigo Postal" required/>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                checked={check}
                onChange={() => setChecked(!check)}
                label="Vivis en un departamento?"
              />
            </FormGroup>
            <Box component="div" sx={check ? {} : { display: "none" }}>
              <Stack spacing={2}>
                <TextField label="Numero Piso" required={check}/>
                <TextField label="Numero Departamento" required={check}/>
              </Stack>
            </Box>

            <TextField label="Localidad" required/>
            <TextField label="Provincia" required/>
            <Button type="submit" variant="contained">
              Guardar Domicilio
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Modal>
  );
}
