import { useState } from 'react';
import { Modal, Box, TextField, Stack, Button, FormControl, InputLabel, Select, MenuItem, TableContainer, Table, TableHead, Paper, TableRow, TableBody, TableCell, Typography } from '@mui/material';
import ArticuloManufacturado from '../../../../entidades/ArticuloManufacturado';
import { getAllUnidadMedida, getCategoriasIdSucursal } from '../../../../servicios/vistaInicio/FuncionesAPI';
import ArticuloManufacturadoDetalle from '../../../../entidades/ArticuloManufacturadoDetalle';
import AgregarInsumoModal from './AgregarInsumoModal';

interface AgregarProductoModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (articuloM: ArticuloManufacturado) => void;
    iArticuloM: ArticuloManufacturado;
}

function AgregarProductoModal({ open, onClose, onSubmit, iArticuloM }: AgregarProductoModalProps) {
    const idSucursal = 1;
    const [articuloM, setArticuloM] = useState<ArticuloManufacturado>(iArticuloM);
    const [unidadMedida, setUnidadMedida] = useState(articuloM.unidadMedida.id);
    const [categoria, setCategoria] = useState(articuloM.categoria.id);
    const { data: unidadesMedida } = getAllUnidadMedida();
    const { data: categorias } = getCategoriasIdSucursal(idSucursal);
    const [tablaFila, setTablaFila] = useState<ArticuloManufacturadoDetalle[]>(iArticuloM.articuloManufacturadoDetalles);
    const [openInsumos, setOpenInsumos] = useState(false);

    const handleOpenInsumos = () => setOpenInsumos(true);
    const handleCloseInsumos = () => setOpenInsumos(false);

    const handleSubmit = () => {
        onSubmit(articuloM);
    };

    function removeInsumo(id: number) {
        setTablaFila((filasActuales) =>
            filasActuales.filter((item) => item.articuloInsumo.id !== id)
        );
    }

    const handleSubmitModal = (nuevosInsumos: ArticuloManufacturadoDetalle[]) => {
        // Aquí puedes manejar los insumos seleccionados como desees
        setTablaFila([...tablaFila, ...nuevosInsumos]);
        setOpenInsumos(false);
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
                            onChange={(e) => setArticuloM({ ...articuloM, denominacion: e.target.value })}
                        />
                        <TextField
                            required
                            label="Precio de venta"
                            variant="outlined"
                            value={articuloM.precioVenta}
                            onChange={(e) => setArticuloM({ ...articuloM, precioVenta: parseInt(e.target.value) })}
                        />
                        <FormControl variant="outlined">
                            <InputLabel id="uMedida-label">Unidad de medida</InputLabel>
                            <Select
                                labelId="uMedida-label"
                                value={unidadMedida}
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
                                value={categoria}
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
                            value={articuloM.descripcion}
                            onChange={(e) => setArticuloM({ ...articuloM, descripcion: e.target.value })}
                        />
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
                        />
                        <Button variant="contained" color="info" onClick={handleOpenInsumos}>
                            Agregar insumos
                        </Button>
                        {openInsumos && (
                            <AgregarInsumoModal
                                open={openInsumos}
                                onClose={handleCloseInsumos}
                                onSubmit={handleSubmitModal}
                                filasActuales={tablaFila}
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
                                    {tablaFila.map((fila, index) => (
                                        <TableRow key={fila.articuloInsumo.id}>
                                            <TableCell>{fila.articuloInsumo.denominacion}</TableCell>
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    value={fila.cantidad}
                                                    inputProps={{ min: "1" }}
                                                    onChange={(e) => {
                                                        const newCantidad = parseFloat(e.target.value);
                                                        if (newCantidad > 0) {
                                                            const newTablaFila = [...tablaFila];
                                                            newTablaFila[index] = { ...newTablaFila[index], cantidad: newCantidad };
                                                            setTablaFila(newTablaFila);
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