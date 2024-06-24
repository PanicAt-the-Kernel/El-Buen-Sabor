import { useState } from 'react';
import { Modal, Box, TextField, Stack, Button, FormControl, InputLabel, Select, MenuItem, TableContainer, Table, TableHead, Paper, TableRow, TableBody, TableCell, Typography, Grid, IconButton, Snackbar, Alert } from '@mui/material';
import ArticuloManufacturado from '../../../../entidades/ArticuloManufacturado';
import { getAllUnidadMedida, getCategoriasIdSucursal } from '../../../../servicios/vistaInicio/FuncionesAPI';
import ArticuloManufacturadoDetalle from '../../../../entidades/ArticuloManufacturadoDetalle';
import AgregarInsumoModal from './AgregarInsumoModal';
import DeleteIcon from '@mui/icons-material/Delete';
import Imagen from '../../../../entidades/Imagen';

interface AgregarProductoModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (articuloM: ArticuloManufacturado) => void;
    iArticuloM: ArticuloManufacturado;
}

function AgregarProductoModal({ open, onClose, onSubmit, iArticuloM }: AgregarProductoModalProps) {
    const idSucursal = 1;
    const [articuloM, setArticuloM] = useState<ArticuloManufacturado>(iArticuloM);
    const [unidadMedidaL, setUnidadMedida] = useState(articuloM.unidadMedida.id);
    const [categoriaL, setCategoria] = useState(articuloM.categoria.id);
    const [imagenesL, setImagenesL] = useState<Imagen[]>(articuloM.imagenes);
    const { data: unidadesMedida } = getAllUnidadMedida();
    const { data: categorias } = getCategoriasIdSucursal(idSucursal);
    const [tablaDetalle, setTablaDetalle] = useState<ArticuloManufacturadoDetalle[]>(iArticuloM.articuloManufacturadoDetalles);
    const [openInsumos, setOpenInsumos] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const userRoles: string[] = JSON.parse(localStorage.getItem("userRoles") || "[]");
    const handleOpenInsumos = () => setOpenInsumos(true);
    const handleCloseInsumos = () => setOpenInsumos(false);

    const handleSubmit = () => {
        const selectedCategoria = categorias?.find(cat => cat.id === categoriaL);
        const selectedUMedida = unidadesMedida?.find(um => um.id === unidadMedidaL);

        if (!selectedCategoria || !selectedUMedida) {
            console.error("La categoría o unidad de medida seleccionados son inválidos.");
            return;
        }

        const updatedProducto = {
            ...articuloM,
            categoria: selectedCategoria,
            unidadMedida: selectedUMedida,
            imagenes: imagenesL,
            articuloManufacturadoDetalles: tablaDetalle,
        };

        setArticuloM(updatedProducto);
        onSubmit(updatedProducto);
    };

    function removeInsumo(id: number) {
        setTablaDetalle((filasActuales) =>
            filasActuales.filter((item) => item.articuloInsumo.id !== id)
        );
    }

    const handleSubmitModal = (nuevosInsumos: ArticuloManufacturadoDetalle[]) => {
        // Aquí puedes manejar los insumos seleccionados como desees
        setTablaDetalle([...tablaDetalle, ...nuevosInsumos]);
        setOpenInsumos(false);
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
                imagen.fechaBaja = "9999-12-31";
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
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    overflow: 'auto',
                    maxHeight: 600
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
                            value={articuloM.denominacion}
                            disabled={!userRoles.includes("ADMIN")}
                            onChange={(e) => setArticuloM({ ...articuloM, denominacion: e.target.value })}
                        />
                        <TextField
                            required
                            label="Precio de venta"
                            variant="outlined"
                            value={articuloM.precioVenta}
                            disabled={!userRoles.includes("ADMIN")}
                            onChange={(e) => setArticuloM({ ...articuloM, precioVenta: parseInt(e.target.value) })}
                        />
                        <FormControl variant="outlined">
                            <InputLabel id="uMedida-label">Unidad de medida</InputLabel>
                            <Select
                                labelId="uMedida-label"
                                value={unidadMedidaL}
                                disabled={!userRoles.includes("ADMIN")}
                                onChange={(e) => setUnidadMedida(e.target.value as number)}
                                label="Unidad de medida"
                            >
                                {unidadesMedida?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
                                    .map((unidadMedida) => (
                                        <MenuItem key={unidadMedida.id} value={unidadMedida.id}>
                                            {unidadMedida.denominacion}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel id="categoria-label">Categoría</InputLabel>
                            <Select
                                labelId="categoria-label"
                                value={categoriaL}
                                disabled={!userRoles.includes("ADMIN")}
                                onChange={(e) => setCategoria(e.target.value as number)}
                                label="Categoria"
                            >
                                {categorias?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
                                    .map((categoria) => (
                                        <MenuItem key={categoria.id} value={categoria.id}>
                                            {categoria.denominacion}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Descripción"
                            variant="outlined"
                            disabled={!userRoles.includes("ADMIN")}
                            value={articuloM.descripcion}
                            onChange={(e) => setArticuloM({ ...articuloM, descripcion: e.target.value })}
                        />
                        <input
                            type="file"
                            disabled={!userRoles.includes("ADMIN")}
                            accept="image/*"
                            multiple
                            style={{ display: 'none' }}
                            id="file-upload"
                            onChange={handleImageUpload}
                        />
                        <label htmlFor="file-upload">
                            <Button variant="contained" component="span"  disabled={!userRoles.includes("ADMIN")}>
                                Agregar Imagen
                            </Button>
                        </label>
                        {/* Visualización de las imágenes */}
                        <Grid container spacing={1}>
                            {imagenesL.map((imagen, index) => (
                                <Grid item key={index} marginBottom={2}>
                                    <img src={imagen.url} alt={`Imagen ${index}`} style={{ maxWidth: 200 }} />
                                    <IconButton aria-label="eliminar" onClick={() => handleDeleteImage(index)}  disabled={!userRoles.includes("ADMIN")}>
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
                        <TextField
                            label="Tiempo estimado en minutos"
                            variant="outlined"
                            value={articuloM.tiempoEstimadoMinutos}
                            onChange={(e) => setArticuloM({ ...articuloM, tiempoEstimadoMinutos: parseInt(e.target.value) })}
                        />
                        <TextField
                            label="Preparación"
                            variant="outlined"
                            value={articuloM.preparacion}
                            onChange={(e) => setArticuloM({ ...articuloM, preparacion: e.target.value })}
                            multiline
                            rows={3}
                        />
                        <Button variant="contained" color="info" onClick={handleOpenInsumos}>
                            Agregar insumos
                        </Button>
                        {openInsumos && (
                            <AgregarInsumoModal
                                open={openInsumos}
                                onClose={handleCloseInsumos}
                                onSubmit={handleSubmitModal}
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



                                    {tablaDetalle.sort((a, b) => a.articuloInsumo.denominacion.localeCompare(b.articuloInsumo.denominacion))
                                        .map((fila, index) => (
                                            <TableRow key={fila.articuloInsumo.id}>
                                                <TableCell>{fila.articuloInsumo.denominacion + " (" + fila.articuloInsumo.unidadMedida.denominacion.toLowerCase() + ")"}</TableCell>
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
                                                        onClick={() => removeInsumo(Number(fila.articuloInsumo.id))}
                                                    >
                                                        -
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 10 }}>
                            Guardar
                        </Button>
                        <Button variant="contained" color="secondary" onClick={onClose}>
                            Cancelar
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    );
};

export default AgregarProductoModal;