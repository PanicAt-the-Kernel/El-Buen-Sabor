import { ArrowDownward } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Domicilio from "../../../../entidades/Domicilio";
import { useState } from "react";
import { getClienteId, getLocalidadesIdProvincia, getProvinciasIdPais } from "../../../../servicios/vistaInicio/FuncionesAPI";

interface DomicilioAcordeonTypes {
  iDomicilio: Domicilio;
}

export default function DomicilioAcordeon({ iDomicilio }: DomicilioAcordeonTypes) {
  const { data: cliente } = getClienteId("velasconico003@gmail.com");
  const [domicilio, setDomicilio] = useState<Domicilio>(iDomicilio);
  const [provincia, setProvincia] = useState(domicilio.localidad.provincia.id);
  const [localidad, setLocalidad] = useState(domicilio.localidad.id);
  const { data: provincias } = getProvinciasIdPais(1);
  const { data: localidades } = getLocalidadesIdProvincia(provincia);

  const handleProvinciaChange = (event: SelectChangeEvent<number>) => {
    setProvincia(event.target.value as number);
    setLocalidad(0);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownward />}>
        <Typography>{domicilio.calle + " " + domicilio.numero + " " + domicilio.localidad.nombre}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          spacing={{ xs: 1, sm: 1, md: 1 }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={12} md={3}>
            <TextField
              required
              label="Calle"
              variant="outlined"
              value={domicilio.calle}
              onChange={(e) => setDomicilio({ ...domicilio, calle: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <TextField
              required
              label="Numero"
              variant="outlined"
              value={domicilio.numero}
              onChange={(e) => setDomicilio({ ...domicilio, numero: Number(e.target.value) })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <TextField
              required
              label="Codigo Postal"
              variant="outlined"
              value={domicilio.cp}
              onChange={(e) => setDomicilio({ ...domicilio, cp: Number(e.target.value) })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <TextField
              required
              label="Numero Piso"
              variant="outlined"
              value={domicilio.piso}
              onChange={(e) => setDomicilio({ ...domicilio, piso: Number(e.target.value) })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <TextField
              required
              label="Numero Departamento"
              variant="outlined"
              value={domicilio.nroDpto}
              onChange={(e) => setDomicilio({ ...domicilio, nroDpto: Number(e.target.value) })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormControl fullWidth variant="outlined" disabled={!provincia}>
              <InputLabel id="localidad-label">Localidad</InputLabel>
              <Select
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
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="provincia-label">Provincia</InputLabel>
              <Select
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
          </Grid>
        </Grid>
      </AccordionDetails>
      <AccordionActions>
        <Button>Modificar</Button>
        <Button>Eliminar</Button>
      </AccordionActions>
    </Accordion>
  );
}
