import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import Domicilio from "../../../../entidades/Domicilio";
import { editCliente, getClienteId, getLocalidadesIdProvincia, getProvinciasIdPais } from "../../../../servicios/vistaInicio/FuncionesAPI";

interface ModalDomicilioTypes {
  open: boolean;
  setOpen: (item: boolean) => void;
}

export default function ModalDomicilio({ open, setOpen }: ModalDomicilioTypes) {
  const [check, setChecked] = useState<boolean>(false);
  const { data: cliente } = getClienteId("velasconico003@gmail.com");
  const [domicilio, setDomicilio] = useState<Domicilio>(new Domicilio);
  const [provincia, setProvincia] = useState(domicilio.localidad.provincia.id);
  const [localidad, setLocalidad] = useState(domicilio.localidad.id);
  const { data: provincias } = getProvinciasIdPais(1);
  const { data: localidades } = getLocalidadesIdProvincia(provincia);

  const handleProvinciaChange = (event: SelectChangeEvent<number>) => {
    setProvincia(event.target.value as number);
    setLocalidad(0);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const selectedLocalidad = localidades?.find(loc => loc.id === localidad);

    if (!selectedLocalidad || !cliente) {
      console.error("La localidad seleccionada es inválida.");
      return;
    }

    const updatedDomicilio = {
      ...domicilio,
      localidad: selectedLocalidad,
    };

    setDomicilio(updatedDomicilio);
    cliente.domicilios.push(updatedDomicilio);
    console.log(cliente);
    editCliente(cliente);
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
        <Box component="form" autoComplete="off" onSubmit={(e) => onSubmit(e)}>
          <Typography variant="h4" sx={{ marginBottom: 1 }}>Agregar un nuevo domicilio</Typography>
          <Stack spacing={2}>
            <TextField label="Calle" required />
            <TextField label="Numero" required />
            <TextField label="Codigo Postal" required />
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
                <TextField label="Numero Piso" required={check} />
                <TextField label="Numero Departamento" required={check} />
              </Stack>
            </Box>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="provincia-label">Provincia</InputLabel>
              <Select
                required
                labelId="provincia-label"
                value={provincia}
                onChange={handleProvinciaChange}
                label="Provincia"
              >
                {provincias?.sort((a, b) => a.nombre.localeCompare(b.nombre))
                  .map((provincia) => (
                    <MenuItem key={provincia.id} value={provincia.id}>
                      {provincia.nombre}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" disabled={!provincia}>
              <InputLabel id="localidad-label">Localidad</InputLabel>
              <Select
                required
                labelId="localidad-label"
                value={localidad}
                onChange={(e) => setLocalidad(e.target.value as number)}
                label="Localidad"
              >
                {localidades?.sort((a, b) => a.nombre.localeCompare(b.nombre))
                  .map((localidad) => (
                    <MenuItem key={localidad.id} value={localidad.id}>
                      {localidad.nombre}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained">
              Guardar Domicilio
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Modal>
  );
}
