import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Pedido from "../../../../entidades/Pedido";
import DetallePedido from "../../../../entidades/DetallePedido";

interface ModalPedidosTypes {
  open: boolean;
  pedido: Pedido;
  setOpen: (item: boolean) => void;
}

export default function ModalPedidos({
  open,
  setOpen,
  pedido,
}: ModalPedidosTypes) {
  console.log(pedido.domicilio.nroDpto);
  return (
    <Modal open={open} onClose={() => setOpen(!open)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h5" textAlign={"center"}>
            Datos Extra de Pedido
          </Typography>
          <Paper elevation={2}>
            <Typography sx={{ marginLeft: 1 }}>Datos de Domicilio</Typography>
            <Stack spacing={1} sx={{ padding: 1 }}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Calle"
                  defaultValue={pedido.domicilio.calle}
                  inputProps={{ readOnly: true }}
                />
                <TextField
                  label="Numero"
                  defaultValue={pedido.domicilio.numero}
                  inputProps={{ readOnly: true }}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Piso"
                  defaultValue={pedido.domicilio.piso}
                  inputProps={{ readOnly: true }}
                />
                <TextField
                  label="Numero Departamento"
                  defaultValue={pedido.domicilio.nroDpto}
                  inputProps={{ readOnly: true }}
                />
              </Stack>
              <TextField
                label="Codigo Postal"
                defaultValue={pedido.domicilio.cp}
                inputProps={{ readOnly: true }}
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Localidad"
                  defaultValue={pedido.domicilio.localidad.nombre}
                  inputProps={{ readOnly: true }}
                />
                <TextField
                  label="Provincia"
                  defaultValue={pedido.domicilio.localidad.provincia.nombre}
                  inputProps={{ readOnly: true }}
                />
              </Stack>
            </Stack>
          </Paper>
          <Paper elevation={2}>
            <Typography sx={{ marginLeft: 1 }}>Datos de Cliente</Typography>
            <Stack spacing={1} sx={{ padding: 1 }}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Nombre Cliente"
                  defaultValue={pedido.cliente.nombre}
                  inputProps={{ readOnly: true }}
                />
                <TextField
                  label="Apellido Cliente"
                  defaultValue={pedido.cliente.apellido}
                  inputProps={{ readOnly: true }}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Email"
                  defaultValue={pedido.cliente.email}
                  inputProps={{ readOnly: true }}
                />
                <TextField
                  label="Telefono"
                  defaultValue={pedido.cliente.telefono}
                  inputProps={{ readOnly: true }}
                />
              </Stack>
            </Stack>
          </Paper>
          <Paper elevation={2}>
            <Typography sx={{marginLeft:2}}>Articulos Pedidos</Typography>
            <Grid
              container
              sx={{
                display:"flex",
                flexDirection:"column",
                overflow: "hidden",
                overflowY: "scroll",
                height:220,
              }}
              
            >
              {pedido.detallePedidos.map((detalle: DetallePedido) => (
                <Grid item spacing={1} md={6} sx={{padding:2}}>
                  <Card sx={{width:200,height:180,marginLeft:2}}>
                    <CardMedia
                      component="img"
                      image={"https://storage.googleapis.com/fitia-api-bucket/media/images/recipe_images/1002846.jpg"}
                      sx={{padding:1}}
                    />
                    <CardContent>
                        <Typography variant="body1"textAlign={"center"}>Texto Articulo</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Stack>
      </Box>
    </Modal>
  );
}
