import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Pedido from "../../../../entidades/Pedido";
import DetallePedido from "../../../../entidades/DetallePedido";
import { useState } from "react";
import { Info } from "@mui/icons-material";

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
  const [openInfo, setOpenInfo] = useState<boolean>(false);

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
          overflow: "auto",
          maxHeight: 700,
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
                  defaultValue={pedido.domicilio!.calle}
                  inputProps={{ readOnly: true }}
                />
                <TextField
                  label="Numero"
                  defaultValue={pedido.domicilio!.numero}
                  inputProps={{ readOnly: true }}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Piso"
                  defaultValue={pedido.domicilio!.piso}
                  inputProps={{ readOnly: true }}
                />
                <TextField
                  label="Numero Departamento"
                  defaultValue={pedido.domicilio!.nroDpto}
                  inputProps={{ readOnly: true }}
                />
              </Stack>
              <TextField
                label="Codigo Postal"
                defaultValue={pedido.domicilio!.cp}
                inputProps={{ readOnly: true }}
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Localidad"
                  defaultValue={pedido.domicilio!.localidad.nombre}
                  inputProps={{ readOnly: true }}
                />
                <TextField
                  label="Provincia"
                  defaultValue={pedido.domicilio!.localidad.provincia.nombre}
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
                  defaultValue={pedido.cliente!.nombre}
                  inputProps={{ readOnly: true }}
                />
                <TextField
                  label="Apellido Cliente"
                  defaultValue={pedido.cliente!.apellido}
                  inputProps={{ readOnly: true }}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Email"
                  defaultValue={pedido.cliente!.userName}
                  inputProps={{ readOnly: true }}
                />
                <TextField
                  label="Telefono"
                  defaultValue={pedido.cliente!.telefono}
                  inputProps={{ readOnly: true }}
                />
              </Stack>
            </Stack>
          </Paper>
          <Paper elevation={2}>
            <Typography sx={{ marginLeft: 2 }}>Articulos Pedidos</Typography>
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                overflowY: "scroll",
                overflowX: "scroll",
                height: 250,
              }}
              spacing={1}
            >
              {pedido.detallePedidos.map((detalle: DetallePedido) => {
                if (detalle.articulo) {
                  return (
                    <Grid item md={6} sx={{ padding: 2 }}>
                      <Card sx={{ width: 200, height: 250, marginLeft: 2 }}>
                        <CardMedia
                          component="img"
                          image={
                            //@ts-ignore
                            detalle.articulo.imagenes[0].url
                          }
                          sx={{ padding: 1, maxHeight: 125 }}
                        />
                        <CardContent>
                          <Typography variant="body1" textAlign={"center"}>
                            {
                              //@ts-ignore
                              detalle.articulo.denominacion
                            }
                          </Typography>
                          <Typography variant="body1" textAlign={"center"}>
                            {"Precio x unidad: $" +
                              detalle.subTotal / detalle.cantidad}
                          </Typography>
                          <Typography variant="body1" textAlign={"center"}>
                            {"Cantidad: " + detalle.cantidad}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                } else {
                  return (
                    <Grid item md={6} sx={{ padding: 1 }}>
                      <Card
                        sx={{
                          width: 200,
                          height: 250,
                          marginLeft: 2,
                          overflow: "hidden",
                          overflowY: "scroll",
                        }}
                      >
                        <CardMedia
                          component="img"
                          //@ts-ignore
                          image={detalle.promocion.imagenes[0].url}
                          sx={{ padding: 1, maxHeight: 125 }}
                        />
                        <CardContent>
                          {/*@ts-ignore */}
                          <Typography variant="body1" textAlign={"center"}>
                            {/*@ts-ignore */}
                            {detalle.promocion.denominacion}
                          </Typography>
                          <Typography variant="body1" textAlign={"center"}>
                            {"Precio x unidad: $" +
                              detalle.subTotal / detalle.cantidad}
                          </Typography>
                          <Typography variant="body1" textAlign={"center"}>
                            {"Cantidad: " + detalle.cantidad}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Stack>
                            <Button
                              size="small"
                              variant="contained"
                              color="info"
                              startIcon={<Info />}
                              onClick={() => setOpenInfo(!openInfo)}
                            >
                              ¿Qué trae?
                            </Button>
                            <Modal
                              open={openInfo}
                              onClose={() => setOpenInfo(!openInfo)}
                            >
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  width: 600,
                                  bgcolor: "background.paper",
                                  boxShadow: 24,
                                  p: 2,
                                  overflow: "auto",
                                  maxHeight: 700,
                                }}
                              >
                                <List>
                                  <Typography>Datos de la promo</Typography>
                                  {/*@ts-ignore */}
                                  {detalle.promocion.promocionDetalles.map(
                                    /*@ts-ignore */
                                    (promo, index: number) => (
                                      <ListItem key={index}>
                                        <ListItemText
                                          primary={
                                            promo.cantidad +
                                            " " +
                                            promo.articulo.denominacion
                                          }
                                        />
                                      </ListItem>
                                    )
                                  )}
                                </List>
                              </Box>
                            </Modal>
                          </Stack>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Paper>
        </Stack>
      </Box>
    </Modal>
  );
}
