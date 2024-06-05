import { useState } from "react";
import { Modal, Box, TextField, Typography, Stack, Button, Grid, IconButton, Snackbar, Alert, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from "@mui/material";
import Promocion from "../../../../entidades/Promocion";
import PromocionDetalle from "../../../../entidades/PromocionDetalle";
import Imagen from "../../../../entidades/Imagen";
import Sucursal from "../../../../entidades/Sucursal";
import DeleteIcon from '@mui/icons-material/Delete';
import AgregarDetalleModal from "./AgregarDetalleModal";
import EditarSucursalesModal from "./EditarSucursalesModal";

interface AgregarPromocionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (promocion: Promocion) => void;
  iPromocion: Promocion;
}

function AgregarPromocionModal({ open, onClose, onSubmit, iPromocion }: AgregarPromocionModalProps) {
  //const idSucursal = 1;
  const [promocion, setPromocion] = useState<Promocion>(iPromocion);
  const [imagenesL, setImagenesL] = useState<Imagen[]>(promocion.imagenes);
  const [tablaDetalle, setTablaDetalle] = useState<PromocionDetalle[]>(promocion.promocionDetalles);
  const [listaSucursales, setListaSucursales] = useState<Sucursal[]>(promocion.sucursales);
  const [openDetalles, setOpenDetalles] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSucursales, setOpenSucursales] = useState(false);

  const handleOpenSucursales = () => setOpenSucursales(true);
  const handleCloseSucursales = () => setOpenSucursales(false);
  const handleSubmitModalSucursales = (nuevasSucursales: Sucursal[]) => {
    setListaSucursales(nuevasSucursales);
    setOpenSucursales(false);
  };

  const handleOpenDetalles = () => setOpenDetalles(true);
  const handleCloseDetalles = () => setOpenDetalles(false);
  const handleSubmitModalDetalle = (nuevosDetalles: PromocionDetalle[]) => {
    setTablaDetalle([...tablaDetalle, ...nuevosDetalles]);
    setOpenDetalles(false);
  };
  
  function removeDetalle(id: number) {
    setTablaDetalle((filasActuales) =>
      filasActuales.filter((item) => item.articulo.id !== id)
    );
  }

  const handleSubmit = () => {
    const updatedPromocion = {
      ...promocion,
      sucursales: listaSucursales,
      imagenes: imagenesL,
      promocionDetalles: tablaDetalle,
    };

    setPromocion(updatedPromocion);
    console.log(updatedPromocion);
    console.log(promocion);
    onSubmit(updatedPromocion);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    if ((files.length + imagenesL.length) > 3) {
      setOpenSnackbar(true);
      return;
    }

    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'grupardo'); // Reemplaza 'your_cloudinary_upload_preset' con tu preset de Cloudinary
      const response = await fetch('https://api.cloudinary.com/v1_1/dafcqvadi/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    });

    try {
      const urls = await Promise.all(uploadPromises);
      const newImages = urls.map(url => {
        const imagen = new Imagen();
        imagen.id = 0;
        imagen.url = url;
        imagen.eliminado = false;
        return imagen;
      });
      setImagenesL([...imagenesL, ...newImages]);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...imagenesL];
    updatedImages.splice(index, 1);
    setImagenesL(updatedImages);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflow: 'auto',
          maxHeight: 600,
        }}
      >
        <Box
          component="form"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Stack spacing={2}>
            <TextField
              required
              label="Nombre"
              variant="outlined"
              value={promocion.denominacion}
              onChange={(e) => setPromocion({ ...promocion, denominacion: e.target.value })}
            />
            <TextField
              label="Precio"
              required
              variant="outlined"
              type="number"
              value={promocion.precioPromocional}
              onChange={(e) => setPromocion({ ...promocion, precioPromocional: Number(e.target.value) })}
              inputProps={{
                step: 0.01,
                min: 0,
              }}
            />
            <TextField
              label="Fecha desde"
              required
              type="date"
              variant="outlined"
              value={promocion.fechaDesde}
              onChange={(e) => setPromocion({ ...promocion, fechaDesde: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Fecha hasta"
              required
              variant="outlined"
              type="date"
              value={promocion.fechaHasta}
              onChange={(e) => setPromocion({ ...promocion, fechaHasta: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Hora desde"
              required
              type="time"
              variant="outlined"
              value={promocion.horaDesde}
              onChange={(e) => setPromocion({ ...promocion, horaDesde: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Hora hasta"
              required
              type="time"
              variant="outlined"
              value={promocion.horaHasta}
              onChange={(e) => setPromocion({ ...promocion, horaHasta: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Descripcion"
              required
              variant="outlined"
              value={promocion.descripcionDescuento}
              onChange={(e) => setPromocion({ ...promocion, descripcionDescuento: e.target.value })}
              multiline
              rows={3}
            />
            <TextField
              label="Tipo de promoción"
              required
              variant="outlined"
              value={promocion.tipoPromocion}
              onChange={(e) => setPromocion({ ...promocion, tipoPromocion: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              id="file-upload"
              onChange={handleImageUpload}
            />
            <label htmlFor="file-upload">
              <Button variant="contained" component="span">
                Agregar Imagen
              </Button>
            </label>
            {/* Visualización de las imágenes */}
            <Grid container spacing={1}>
              {imagenesL.map((imagen, index) => (
                <Grid item key={index} marginBottom={2}>
                  <img src={imagen.url} alt={`Imagen ${index}`} style={{ maxWidth: 200 }} />
                  <IconButton aria-label="eliminar" onClick={() => handleDeleteImage(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="error">
                No puedes seleccionar más de 3 imágenes.
              </Alert>
            </Snackbar>
            <Button variant="contained" color="info" onClick={handleOpenSucursales}>
              Editar Sucursales
            </Button>
            <Button variant="contained" color="info" onClick={handleOpenDetalles}>
              Agregar artículos
            </Button>
            {openDetalles && (
              <AgregarDetalleModal
                open={openDetalles}
                onClose={handleCloseDetalles}
                onSubmit={handleSubmitModalDetalle}
                filasActuales={tablaDetalle}
              />
            )}
            <TableContainer component={Paper} className="form-group mt-3">
              <Typography variant="h6" sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
                Insumos
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tablaDetalle.sort((a, b) => a.articulo.denominacion.localeCompare(b.articulo.denominacion))
                    .map((fila, index) => (
                      <TableRow key={fila.articulo.id}>
                        <TableCell>{fila.articulo.denominacion + " (" + fila.articulo.unidadMedida.denominacion.toLowerCase() + ")"}</TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={fila.cantidad}
                            inputProps={{ min: "1" }}
                            onChange={(e) => {
                              const newCantidad = parseFloat(e.target.value);
                              if (newCantidad > 0) {
                                const newTablaDetalle = [...tablaDetalle];
                                newTablaDetalle[index] = { ...newTablaDetalle[index], cantidad: newCantidad };
                                setTablaDetalle(newTablaDetalle);
                              } else {
                                alert("La cantidad debe ser un número positivo mayor a 0");
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => removeDetalle(Number(fila.articulo.id))}
                          >
                            -
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="contained" color="primary" type="submit" style={{ marginTop: 50 }}>
              Guardar
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancelar
            </Button>
          </Stack>
          {openSucursales && promocion && (
            <EditarSucursalesModal
              open={openSucursales}
              onClose={handleCloseSucursales}
              onSubmit={handleSubmitModalSucursales}
              iPromocion={promocion}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
}

export default AgregarPromocionModal;
