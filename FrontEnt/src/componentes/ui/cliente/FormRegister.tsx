import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { saveUsuario } from "../../../servicios/vistaInicio/FuncionesAPI";

export default function FormRegister() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  //ESTADOS VALIDAR
  const [nombreUsuarioError, setNombreUsuarioError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);

  //ESTADOS HELPERTEXT
  const [usuarioHelper, setUsuarioHelper] = useState(
    "Tu nombre de usuario debe tener como minimo 8 caracteres,sin espacios ni caracteres especiales"
  );
  const [password1Helper, setPasswordHelper] = useState(
    "Tu contrasena debe tener entre 8 y 12 caracteres, un numero y una mayuscula"
  );
  const [password2Helper, setPassword2Helper] = useState(
    "Repita la contrasena"
  );

  //FUNCIONES VALIDAR
  const validarUsuario = () => {
    //Si no tiene simbolos especiales
    if (!/[@!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(nombreUsuario)) {
      //Limpiar Error

      setNombreUsuarioError(false);
      setUsuarioHelper(
        "Tu nombre de usuario debe tener como minimo 8 caracteres,sin espacios ni caracteres especiales"
      );

      //Si no tiene espacis en blanco
      if (!/\s/.test(nombreUsuario)) {
        //Limpiar Error
        setNombreUsuarioError(false);
        setUsuarioHelper(
          "Tu nombre de usuario debe tener como minimo 8 caracteres,sin espacios ni caracteres especiales"
        );

        return true;
      } else {
        //Setear el error y setear el helpText
        setNombreUsuarioError(true);
        setUsuarioHelper("El nombre de usuario no debe tener espacios");
        return false;
      }
    } else {
      //Setear el error y setear el helpText
      setNombreUsuarioError(true);
      setUsuarioHelper(
        "El nombre de usuario no debe tener caracteres especiales"
      );
      return false;
    }
  };

  const validarPasswords = () => {
    //Si las contrasenas son iguales
    if (password === repeatPass) {
      //Limpiar Error
      setPasswordError(false);
      setPassword2Error(false);
      setPasswordHelper(
        "La contrasena debe tener entre 8 y 12 caracteres, un numero y una mayuscula"
      );
      setPassword2Helper("Repita la contrasena");

      //Si la contrasena tiene al menos un numero
      if (/\d/.test(password)) {
        setPasswordError(false);
        setPasswordHelper(
          "La contrasena debe tener entre 8 y 12 caracteres, un numero y una mayuscula"
        );

        //Si la contrasena tiene al menos una mayuscula
        if (/[A-Z]/.test(password)) {
          //Limpiar Error
          setPasswordError(false);
          setPasswordHelper(
            "La contrasena debe tener entre 8 y 12 caracteres, un numero y una mayuscula"
          );

          return true;
        } else {
          setPasswordError(true);
          setPasswordHelper("La contrasena debe tener al menos una mayuscula");
          return false;
        }
      } else {
        setPasswordError(true);
        setPasswordHelper("La contrasena debe tener al menos un numero");
        return false;
      }
    } else {
      setPasswordError(true);
      setPassword2Error(true);
      setPasswordHelper("Las contrasenas no coinciden");
      setPassword2Helper("Las contrasenas no coinciden");
      return false;
    }
  };

  //const [intercalar, setIntecalar] = useState(false);

  const onSubmitUsuario = (e: SyntheticEvent) => {
    e.preventDefault();
    if (validarPasswords()) {
      saveUsuario(nombreUsuario,password)
    } else {
      return false;
    }
  };

  /*
  //Formulario Cliente
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitCliente = (e: SyntheticEvent) => {
    e.preventDefault();
    //Objeto Usuario
    let usuario = new Usuario();
    usuario.username = nombreUsuario;

    //Objeto Cliente
    let cliente = new Cliente();
    cliente.nombre = nombre;
    cliente.apellido = apellido;
    cliente.telefono = Number(telefono);
    cliente.email = email;
    cliente.usuario = usuario;

    //FUNCION ALTA USUARIO
    //saveUsuario(cliente,usuario)?
  };*/

  return (
    <>
      <Stack spacing={2} sx={{ padding: 3 }}>
        <Typography>Crea tu usuario</Typography>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={(e) => {
            onSubmitUsuario(e);
          }}
        >
          <Stack spacing={2}>
            <TextField
              required
              type="text"
              label="Nombre de Usuario"
              helperText={usuarioHelper}
              error={nombreUsuarioError}
              value={nombreUsuario}
              onChange={(e) => {
                setNombreUsuario(e.target.value);
                validarUsuario();
              }}
              inputProps={{
                minLength: 8,
              }}
            />
            <TextField
              required
              type="password"
              label="Ingrese una contraseña"
              helperText={password1Helper}
              error={passwordError}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              inputProps={{
                minLength: 8,
                maxLength: 12,
              }}
            />
            <TextField
              required
              type="password"
              label="Repita la contraseña"
              value={repeatPass}
              helperText={password2Helper}
              error={password2Error}
              onChange={(e) => setRepeatPass(e.target.value)}
            />
            <Button type="submit" variant="contained" color="info">
              CONTINUAR
            </Button>
          </Stack>
        </Box>
      </Stack>

      {/*} <Stack spacing={2} sx={!intercalar ? { display: "none" } : { padding: 3 }}>
        <Typography>Cuentanos mas sobre ti...</Typography>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={(e) => onSubmitCliente(e)}
        >
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
              required
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
              <FormControl fullWidth>
                <Select></Select>
              </FormControl>
              <FormControl fullWidth>
                <Select></Select>
              </FormControl>
            </Stack>
            <Button type="submit" variant="contained">
              Finalizar Registro
            </Button>
          </Stack>
        </Box>
      </Stack> */}
    </>
  );
}
