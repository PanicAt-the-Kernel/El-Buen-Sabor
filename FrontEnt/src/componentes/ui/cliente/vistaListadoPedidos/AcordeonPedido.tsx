import { ArrowDropDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
} from "@mui/material";

interface AcordeonPedidoTypes{
  open:boolean;
  setOpen:(item:boolean)=>void;
}

export default function AcordeonPedido({open,setOpen}:AcordeonPedidoTypes) {
  return (
    <Accordion sx={{ backgroundColor: "#B9E4C9" }}>
      <AccordionSummary expandIcon={<ArrowDropDown />}>
        <Stack direction="row" spacing={1} alignItems={"center"}>
          <Typography>Pedido N°123456</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 2, sm: 2, md: 5 }}
        >
          <fieldset>
            <legend>Datos de Facturacion</legend>
            <Stack>
              <Typography>Metodo de Entrega: Delivery</Typography>
              <Typography>Metodo de Pago: Mercado Pago</Typography>
              <Typography>Domicilio: Calle Falsa 123</Typography>
            </Stack>
          </fieldset>
          <fieldset>
            <legend>Datos Cliente</legend>
            <Stack>
              <Typography>Nombre: Debora</Typography>
              <Typography>Apellido: Meltrozo</Typography>
              <Typography>Telefono: 261-123456</Typography>
            </Stack>
          </fieldset>
          <fieldset>
            <legend>Datos Sucursal</legend>
            <Typography>Nombre Sucursal: Carlitos</Typography>
            <Typography>Direccion: Calle Real 321</Typography>
            <Typography>Localidad: Lujan de Cuyo</Typography>
            <Typography>Provincia: Mendoza</Typography>
          </fieldset>
          <fieldset>
            <legend>Datos Pedido</legend>
            <Typography>Fecha pedido: 06/06/2006</Typography>
            <Typography>Monto Total $123456789</Typography>
            <Typography>Estado Pedido: Entregado</Typography>
          </fieldset>
        </Stack>
      </AccordionDetails>
      <AccordionActions>
        <Button variant="contained" color="info">
          <Typography sx={{fontSize:13}} onClick={()=>setOpen(!open)}>Productos Pedidos</Typography>
        </Button>
        <Button variant="contained" color="warning">
          <Typography sx={{fontSize:13}}>Descargar Factura</Typography>
        </Button>
      </AccordionActions>
    </Accordion>
  );
}
