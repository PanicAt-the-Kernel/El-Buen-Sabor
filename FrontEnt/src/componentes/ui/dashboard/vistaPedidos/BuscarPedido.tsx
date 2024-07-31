import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import GrillaPedidos from "./GrillaPedidos";

function BuscadorEmpleado() {
  const [estado, setEstado] = useState("TODOS");
  const [fecha1, setFecha1] = useState("2024-01-01");
  const [fecha2, setFecha2] = useState("2024-12-31");

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={{
          xs: 1,
          sm: 1,
          md: 2,
        }}
        alignItems="center"
        sx={{ marginTop: 3 }}
      >
        <Box component="form" onSubmit={handleBuscar}>
          <FormControl variant="outlined" sx={{ marginRight: 2, width: 200 }}>
            <InputLabel id="estado-label">Estado del pedido</InputLabel>
            <Select
              label="Estado del pedido"
              required
              variant="outlined"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <MenuItem value="TODOS">TODOS</MenuItem>
              <MenuItem value="APROBADO">APROBADO</MenuItem>
              <MenuItem value="CANCELADO">CANCELADO</MenuItem>
              <MenuItem value="DELIVERY">DELIVERY</MenuItem>
              <MenuItem value="FACTURADO">FACTURADO</MenuItem>
              <MenuItem value="PAGO_REALIZADO">PAGO REALIZADO</MenuItem>
              <MenuItem value="PAGO_RECHAZADO">PAGO RECHAZADO</MenuItem>
              <MenuItem value="PENDIENTE">PENDIENTE</MenuItem>
              <MenuItem value="RECHAZADO">RECHAZADO</MenuItem>
              <MenuItem value="TERMINADO">TERMINADO</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ marginRight: 2 }}
            type="date"
            name="fecha1"
            label="Fecha Inicio"
            value={fecha1}
            onChange={(e) => setFecha1(e.target.value)}
          />
          <TextField
            type="date"
            name="fecha2"
            label="Fecha Fin"
            value={fecha2}
            onChange={(e) => setFecha2(e.target.value)}
          />
        </Box>
      </Stack>
      <GrillaPedidos
        estado={estado}
        fechaDesde={new Date(fecha1)}
        fechaHasta={new Date(fecha2)}
      />
    </Box>
  );
}

export default BuscadorEmpleado;
