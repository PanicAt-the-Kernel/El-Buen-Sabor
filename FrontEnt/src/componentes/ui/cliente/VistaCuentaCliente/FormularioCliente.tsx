import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export default function FormularioCliente() {
  return (
    <Box component="form" autoComplete="off">
      <Stack spacing={2} sx={{padding:4}}>
        <Typography variant={"h4"} textAlign={"center"}>Edita tus datos</Typography>
        <Button
          component="label"
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUpload />}
        >
          Cargar Imagen de Usuario
          <input type="file" hidden />
        </Button>
        <TextField required label="Nombre" />
        <TextField required label="Apellido" />
        <TextField
          required
          type="tel"
          placeholder="261-1234567"
          label="Telefono"
          inputProps={{
            pattern: "[0-9]{3}-[0-9]{6}",
          }}
        />
        <TextField
          required
          type="email"
          label="Email"
          placeholder="ejemplo@ejemplo.com.ar"
        />
        <Button variant="contained" sx={{color:"white"}} color="secondary">Guardar Cambios</Button>
      </Stack>
    </Box>
  );
}
