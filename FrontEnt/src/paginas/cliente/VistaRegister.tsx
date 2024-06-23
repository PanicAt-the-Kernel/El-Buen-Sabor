import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  MenuItem,
  Grid,
  IconButton,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import Cliente from "../../entidades/Cliente";
import Usuario from "../../entidades/Usuario";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getLocalidadesIdProvincia,
  getProvinciasIdPais,
} from "../../servicios/vistaInicio/FuncionesAPI";
import Provincia from "../../entidades/Provincia";
import Localidad from "../../entidades/Localidad";
import { Delete } from "@mui/icons-material";
import Imagen from "../../entidades/Imagen";

export default function FormRegister() {
  const { user, isLoading: userLoading } = useAuth0();
  //Formulario Cliente
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState(user?.email);
  const [localidad, setLocalidad] = useState<number>(0);
  const [provincia, setProvincia] = useState<number>(0);
  const [imagen, setImagen] = useState(null);

  const {
    data: provincias,
    isLoading: prvinciasLoading,
    error: provinciaError,
  } = getProvinciasIdPais(1);
  const {
    data: localidades,
    isLoading: localidadesLoading,
    error: localidadError,
  } = getLocalidadesIdProvincia(provincia);
  //MediaQuery para vista escritorio
  const vistaEscritorio: boolean = useMediaQuery("(min-width:600px)");
  //Si es falso, entonces estas en vista mobile

  if (provinciaError || localidadError) {
    return <h1>Ocurrio un error al cargar los datos...</h1>;
  }

  if (prvinciasLoading || userLoading || localidadesLoading) {
    return <CircularProgress />;
  }

  const handleSubmit = (e: SyntheticEvent) => {
    //email
    //nombre
    //apellido
    //telefono
    //imagen
    //objeto Domicilio
  };

  const handleImageUpload = async (event:any) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'grupardo');

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dafcqvadi/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        setImagen(data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleDeleteImage = () => {
    setImagen(null);
  };

  return (
    <Container>
      <Paper elevation={5} sx={{ padding: 5, marginTop: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h5" align="center">
            Cuentanos mas sobre ti...
          </Typography>
          <Box
            component="form"
            autoComplete="off"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Stack spacing={2}>
              <Stack
                direction={{ xs: "column", sm: "column", md: "row" }}
                spacing={2}
              >
                <TextField
                  required
                  label="Ingresa Tu Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  sx={vistaEscritorio ? { width: 350 } : {}}
                />
                <TextField
                  required
                  label="Ingresa Tu Apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  sx={vistaEscritorio ? { width: 350 } : {}}
                />
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
                  sx={vistaEscritorio ? { width: 350 } : {}}
                />
              </Stack>
              <Stack alignItems={"center"} justifyContent={"center"}>
              <div>
              {imagen ? (
                <>
                  <img src={imagen} alt="imagenEmpleado" style={{ maxWidth: 200, maxHeight: 300 }} />
                  <IconButton aria-label="eliminar" onClick={() => handleDeleteImage()}>
                    <Delete />
                  </IconButton>
                </>
              ) : (
                <label htmlFor="file-upload">
                  <input
                    type="file"
                    accept="image/*"
                    id="file-upload"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <Button variant="contained" component="span">
                    Agregar Imagen
                  </Button>
                </label>
              )}
            </div>
              </Stack>
              
              <TextField
                disabled
                type="email"
                label="Email"
                placeholder="ejemplo@ejemplo.com.ar"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Typography>Datos de envio</Typography>
              <Stack
                direction={{ xs: "column", sm: "column", md: "row" }}
                spacing={2}
              >
                <TextField
                  required
                  label="Calle"
                  sx={vistaEscritorio ? { width: 710 } : {}}
                />
                <TextField
                  required
                  label="Numero"
                  sx={vistaEscritorio ? { width: 350 } : {}}
                  type="number"
                />
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "column", md: "row" }}
                spacing={2}
              >
                <TextField
                  required
                  label="Codigo Postal"
                  sx={vistaEscritorio ? { width: 350 } : {}}
                />
                <TextField
                  required
                  label="Nro Piso"
                  sx={vistaEscritorio ? { width: 350 } : {}}
                />
                <TextField
                  required
                  label="Nro Departamento"
                  sx={vistaEscritorio ? { width: 350 } : {}}
                />
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "column", md: "row" }}
                spacing={2}
              >
                <FormControl fullWidth>
                  <InputLabel id="provincia-select">Provincia</InputLabel>
                  <Select
                    labelId="provincia-select"
                    required
                    label="Provincia"
                    onChange={(e) => setProvincia(Number(e.target.value))}
                    value={provincia}
                  >
                    <MenuItem value={0}>Selecciona una provincia</MenuItem>
                    {provincias
                      ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
                      .map((item: Provincia) => (
                        <MenuItem value={item.id}>{item.nombre}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="localidad-select">Localidad</InputLabel>
                  <Select
                    labelId="localidad-select"
                    required
                    label="Localidad"
                    onChange={(e) => setLocalidad(Number(e.target.value))}
                    value={localidad}
                    disabled={provincia == 0}
                  >
                    <MenuItem value={0}>Selecciona una localidad</MenuItem>
                    {localidades
                      ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
                      .map((item: Localidad) => (
                        <MenuItem value={item.id}>{item.nombre}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Stack>
              <Button type="submit" variant="contained">
                Finalizar Registro
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
