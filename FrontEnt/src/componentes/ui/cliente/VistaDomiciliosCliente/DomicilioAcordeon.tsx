import { ArrowDownward } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function DomicilioAcordeon() {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownward />}>
        <Typography>Domicilio 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          spacing={{ xs: 1, sm: 1, md: 1 }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={12} md={3}>
            <TextField label="Calle"/>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <TextField label="Numero" />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <TextField label="Codigo Postal" />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <TextField label="Numero Piso" />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <TextField label="Numero Departamento" />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <TextField label="Localidad" />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <TextField label="Provincia" />
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
