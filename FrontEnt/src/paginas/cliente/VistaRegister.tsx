import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import Cliente from "../../entidades/Cliente";
import Usuario from "../../entidades/Usuario";
import { useAuth0 } from "@auth0/auth0-react";

export default function FormRegister() {
  const { user, isLoading } = useAuth0();
  //const [nombreUsuario] = useState("");

  if(isLoading){
    return(
      <CircularProgress />
    )
  }

  //Formulario Cliente
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState(user?.email);
  const [localidad, setLocalidad] = useState("none");
  const [pais, setPais] = useState("none");

  return (
    <Paper elevation={5} sx={{padding:5}}>
      <Stack spacing={2}>
        <Typography>Cuentanos mas sobre ti...</Typography>
        <Box component="form" autoComplete="off">
          <Stack spacing={2}>
            <Stack direction="row" spacing={12}>
              <TextField
                required
                label="Ingresa Tu Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <TextField
                required
                label="Ingresa Tu Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </Stack>
            <TextField
              required
              type="tel"
              placeholder="261-1234567"
              label="Telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              inputProps={{
                pattern: "[0-9]{3}-[0-9]{6}",
              }}
            />
           <TextField
              disabled
              type="email"
              label="Email"
              placeholder="ejemplo@ejemplo.com.ar"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography>Datos de envio</Typography>
            <Stack direction="row" spacing={2}>
              <TextField required label="Calle" sx={{ width: 600 }} />
              <TextField required label="Numero" type="number" />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField required label="Codigo Postal" />
              <TextField required label="Nro Piso" />
              <TextField required label="Nro Departamento" />
            </Stack>
            <Stack direction="row" spacing={2}>
              <InputLabel id="localidad-select">Localidad</InputLabel>
              <FormControl fullWidth>
                <Select
                  labelId="localidad-select"
                  required
                  label="Localidad"
                  onChange={(e) => setLocalidad(e.target.value)}
                  value={localidad}
                ></Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="pais-select">Pais</InputLabel>
                <Select
                  labelId="pais-select"
                  required
                  label="Pais"
                  onChange={(e) => setPais(e.target.value)}
                  value={pais}
                ></Select>
              </FormControl>
            </Stack>
            <Button type="submit" variant="contained">
              Finalizar Registro
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
