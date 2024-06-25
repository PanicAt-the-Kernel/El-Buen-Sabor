import { CloudUpload, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";

interface FormularioClienteTypes {
  userEmail: string;
}

export default function FormularioCliente({
  userEmail,
}: FormularioClienteTypes) {
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [email, setEmail] = useState<string>(userEmail);
  const [imagen, setImagen] = useState<string>("");


  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "grupardo");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dafcqvadi/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        setImagen(data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleDeleteImage = () => {
    setImagen("");
  };

  const handleSubmit=(e:SyntheticEvent)=>{
    e.preventDefault();

    if(imagen==""){
      alert("Debe seleccionar una imagen");
      return;
    }


  }

  return (
    <Box component="form" autoComplete="off">
      <Stack spacing={2} sx={{ padding: 4 }}>
        <Typography variant={"h4"} textAlign={"center"}>
          Edita tus datos
        </Typography>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <div>
            {imagen ? (
              <>
                <img
                  src={imagen}
                  alt="imagenCliente"
                  style={{ maxWidth: 200, maxHeight: 300 }}
                />
                <IconButton
                  aria-label="eliminar"
                  onClick={() => handleDeleteImage()}
                >
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
                  style={{ display: "none" }}
                />
                <Button variant="contained" component="span" startIcon={<CloudUpload />}>
                  Agregar Imagen
                </Button>
              </label>
            )}
          </div>
        </Stack>
        <TextField
          required
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          required
          label="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <TextField
          required
          type="tel"
          placeholder="261-1234567"
          label="Telefono"
          inputProps={{
            pattern: "[0-9]{3}-[0-9]{7}",
          }}
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <TextField
          disabled
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" sx={{ color: "white" }} color="secondary">
          Guardar Cambios
        </Button>
      </Stack>
    </Box>
  );
}
