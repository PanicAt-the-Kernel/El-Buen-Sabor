import { useState } from "react";
import { Modal, Box, TextField, Stack, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import Empleado from "../../../../entidades/Empleado";

interface AgregarEmpleadoModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (empleado: Empleado) => void;
  iEmpleado: Empleado;
}

let errorTelefono = false;
let errorNombre = false;
let errorEmail = false;
let errorTipo = false;
let errorFecha = false;

//@ts-ignore
function validateTelefono(e) {
  const aux = /^\d{7,14}$/;
  if (!aux.test(e.target.value)) {
    errorTelefono = true;
  } else {
    errorTelefono = false;
  }
}

//@ts-ignore
function validateEmail(e) {
  const aux = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!aux.test(e.target.value)) {
    errorEmail = true;
  } else {
    errorEmail = false;
  }
}

//@ts-ignore
function validateNombre(e) {
  let aux = e.target.value
  if (aux.length > 50 || aux.length < 1) {
    errorNombre = true;
  } else {
    errorNombre = false;
  }
}

//@ts-ignore
function validateTipo(e) {
  if (!e.target.value) {
    errorTipo = true;
  } else {
    errorTipo = false;
  }
}

//@ts-ignore
function validateFecha(e) {
  const selectedDate = new Date(e.target.value);
  const today = new Date();
  const age = today.getFullYear() - selectedDate.getFullYear();
  const monthDifference = today.getMonth() - selectedDate.getMonth();
  const dayDifference = today.getDate() - selectedDate.getDate();

  if (age > 16 || (age === 16 && (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)))) {
    errorFecha = false;
  } else {
    errorFecha = true;
  }
}

function AgregarEmpleadoModal({ open, onClose, iEmpleado, onSubmit }: AgregarEmpleadoModalProps) {
  const [empleado, setEmpleado] = useState<Empleado>(iEmpleado);

  const handleSubmit = (empleado: Empleado) => {
    onSubmit(empleado);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description">
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
            handleSubmit(empleado);
          }}
        >
          <Stack spacing={2}>
            <TextField
              required
              label="Nombre"
              variant="outlined"
              value={empleado.nombre}
              onInput={validateNombre}
              onChange={(e) => setEmpleado({ ...empleado, nombre: e.target.value })}
            />
            {errorNombre && <span style={{ color: "red" }}>Formato de Nombre Inválido!</span>}
            <TextField
              required
              label="Apellido"
              variant="outlined"
              value={empleado.apellido}
              onInput={validateNombre}
              onChange={(e) => setEmpleado({ ...empleado, apellido: e.target.value })}
            />
            {errorNombre && <span style={{ color: "red" }}>Formato de Apellido Inválido!</span>}
            <TextField
              required
              label="Teléfono"
              variant="outlined"
              value={empleado.telefono}
              onChange={(e) => setEmpleado({ ...empleado, telefono: e.target.value })}
              onInput={validateTelefono}
            />
            {errorTelefono && <span style={{ color: "red" }}>Formato de Teléfono Inválido!</span>}
            <TextField
              required
              label="Email"
              variant="outlined"
              value={empleado.email}
              onChange={(e) => setEmpleado({ ...empleado, email: e.target.value })}
              onInput={validateEmail}
              inputProps={{
                maxLength: 320,
              }}
            />
            {errorEmail && <span style={{ color: "red" }}>Formato de Email Inválido!</span>}
            <FormControl variant="outlined">
              <InputLabel id="tipoEmpleado-label">Tipo de Empleado</InputLabel>
              <Select
                required
                label="Tipo de Empleado"
                variant="outlined"
                value={empleado.rol}
                onChange={(e) => setEmpleado({ ...empleado, rol: e.target.value })}
                onInput={validateTipo}
              >
                <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                <MenuItem value={"CAJERO"}>CAJERO</MenuItem>
                <MenuItem value={"COCINERO"}>COCINERO</MenuItem>
                <MenuItem value={"DELIVERY"}>DELIVERY</MenuItem>
              </Select>
            </FormControl>
            {errorTipo && <span style={{ color: "red" }}>Seleccione un tipo de Empleado!</span>}
            <TextField
              required
              label="Fecha de Nacimiento"
              variant="outlined"
              type="date"
              value={empleado.fechaNacimiento}
              onChange={(e) => {
                setEmpleado({ ...empleado, fechaNacimiento: e.target.value });
                validateFecha(e);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: new Date().toISOString().split("T")[0]
              }}
            />
            {errorFecha && <span style={{ color: "red" }}>Debe ser mayor de 16 años</span>}
            <Button variant="contained" color="primary" type="submit" id="save" disabled={errorEmail || errorTelefono || errorNombre || errorTipo || errorFecha}>
              Guardar
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal >
  );
}

export default AgregarEmpleadoModal;