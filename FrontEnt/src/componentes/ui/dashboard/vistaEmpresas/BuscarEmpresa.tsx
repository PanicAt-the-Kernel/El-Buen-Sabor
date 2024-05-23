import React, { useState } from "react";
import { Box, FormControl, Input, Stack } from "@mui/material";
import BotonAgregarEmpresa from "./BotonAgregarEmpresa";
import TablaEmpresa from "./TablaEmpresa";

function BuscarEmpresa() {
  const [nombre, setNombre] = useState("");

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
      >
        <form onSubmit={handleBuscar}>
          <FormControl fullWidth margin="normal">
            <Input
              placeholder="Buscar empresa"
              id="nombreEmpresa"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              sx={{ width: "300px" }}
            />
          </FormControl>
        </form>
        <BotonAgregarEmpresa />
      </Stack>
      <p></p>
      <TablaEmpresa busqueda={nombre} />
    </Box>
  );
}

export default BuscarEmpresa;
