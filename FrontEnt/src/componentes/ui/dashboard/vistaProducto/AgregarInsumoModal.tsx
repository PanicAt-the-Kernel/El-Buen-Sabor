import { useState } from 'react';
import { Modal, Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button, Paper } from '@mui/material';
import ArticuloManufacturadoDetalle from '../../../../entidades/ArticuloManufacturadoDetalle';
import { getAllArticulosInsumos } from '../../../../servicios/vistaInicio/FuncionesAPI';
import ArticuloInsumo from '../../../../entidades/ArticuloInsumo';

interface AgregarInsumoModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (insumos: ArticuloManufacturadoDetalle[]) => void;
    filasActuales: ArticuloManufacturadoDetalle[];
}

function AgregarInsumoModal({ open, onClose, onSubmit, filasActuales }: AgregarInsumoModalProps) {
    const [selectedInsumos, setSelectedInsumos] = useState<ArticuloManufacturadoDetalle[]>([]);
    const { data: articulosDatos } = getAllArticulosInsumos();
    const [nombreArticulo, setNombreArticulo] = useState<string>('');
    const [nombreCategoria, setNombreCategoria] = useState<string>('');

    const handleSelectInsumo = (insumo: ArticuloInsumo) => {
        const isAlreadySelected = filasActuales.some(fila => fila.articuloInsumo.id === insumo.id);

        if (isAlreadySelected) {
            alert("El insumo ya está agregado.");
            return;
        }

        const index = selectedInsumos.findIndex(selected => selected.articuloInsumo.id === insumo.id);
        if (index !== -1) {
            setSelectedInsumos(prevState => {
                const updatedInsumos = [...prevState];
                updatedInsumos.splice(index, 1);
                return updatedInsumos;
            });
        } else {
            const nuevoInsumo: ArticuloManufacturadoDetalle = new ArticuloManufacturadoDetalle();
            nuevoInsumo.articuloInsumo = insumo;
            nuevoInsumo.cantidad = 1;
            setSelectedInsumos([...selectedInsumos, nuevoInsumo]);
        }
    };

    const handleSubmit = () => {
        onSubmit(selectedInsumos);
        setSelectedInsumos([]);
        onClose();
    };

    const insumosFiltrados = articulosDatos?.filter((item: ArticuloInsumo) => {
        return (
            (nombreArticulo === '' || item.denominacion.toLowerCase().includes(nombreArticulo.toLowerCase())) &&
            (nombreCategoria === '' || item.categoria.denominacion.toLowerCase().includes(nombreCategoria.toLowerCase()))
        );
    });

    return (
        <Modal open={open} onClose={onClose}>
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
                    maxHeight: 580
                }}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    Seleccionar Insumos
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        label="Buscar por nombre"
                        variant="outlined"
                        fullWidth
                        value={nombreArticulo}
                        onChange={(e) => setNombreArticulo(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Buscar por categoría"
                        variant="outlined"
                        fullWidth
                        value={nombreCategoria}
                        onChange={(e) => setNombreCategoria(e.target.value)}
                    />
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Elegir</TableCell>
                                <TableCell align="center">Imagen</TableCell>
                                <TableCell align="center">Denominación</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {insumosFiltrados?.map((item: ArticuloInsumo) => (
                                <TableRow key={item.id}>
                                    <TableCell align="center">
                                        <Checkbox
                                            checked={selectedInsumos.some(selected => selected.articuloInsumo.id === item.id)}
                                            onChange={() => handleSelectInsumo(item)}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <img src={item.imagenes[0].url} width="100%" alt={item.denominacion} />
                                    </TableCell>
                                    <TableCell align="center">{item.denominacion}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>
                        Cancelar
                    </Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Agregar Insumos
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default AgregarInsumoModal;
