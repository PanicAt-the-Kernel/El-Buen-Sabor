import { useState } from 'react';
import { Modal, Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableRow, Checkbox, Button, Paper } from '@mui/material';
import PromocionDetalle from '../../../../entidades/PromocionDetalle';
import { getAllArticulosManufacturados } from '../../../../servicios/vistaInicio/FuncionesAPI';
import ArticuloManufacturado from '../../../../entidades/ArticuloManufacturado';

interface AgregarArticuloModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (articulos: PromocionDetalle[]) => void;
    filasActuales: PromocionDetalle[];
}

function AgregarArticuloModal({ open, onClose, onSubmit, filasActuales }: AgregarArticuloModalProps) {
    //const idSucursal = 1;
    const [selectedArticulos, setSelectedArticulos] = useState<PromocionDetalle[]>([]);
    const { data: articulos } = getAllArticulosManufacturados();
    const [nombreArticulo, setNombreArticulo] = useState<string>('');

    const handleSelectArticulo = (articulo: ArticuloManufacturado) => {
        const isAlreadySelected = filasActuales.some(fila => fila.articulo.id === articulo.id);

        if (isAlreadySelected) {
            alert("El articulo ya está agregado.");
            return;
        }

        const index = selectedArticulos.findIndex(selected => selected.articulo.id === articulo.id);
        if (index !== -1) {
            setSelectedArticulos(prevState => {
                const updatedArticulos = [...prevState];
                updatedArticulos.splice(index, 1);
                return updatedArticulos;
            });
        } else {
            const nuevoArticulo: PromocionDetalle = new PromocionDetalle();
            nuevoArticulo.articulo = articulo;
            nuevoArticulo.cantidad = 1;
            setSelectedArticulos([...selectedArticulos, nuevoArticulo]);
        }
    };

    const handleSubmit = () => {
        onSubmit(selectedArticulos);
        setSelectedArticulos([]);
        onClose();
    };

    const articulosFiltrados = articulos?.filter((item: ArticuloManufacturado) => {
        return (
            (nombreArticulo === '' || item.denominacion.toLowerCase().includes(nombreArticulo.toLowerCase()))
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
                    height: 620
                }}>

                <Box sx={{ mb: 1 }}>
                    <TextField
                        label="Buscar por nombre"
                        variant="outlined"
                        fullWidth
                        value={nombreArticulo}
                        onChange={(e) => setNombreArticulo(e.target.value)}

                    />
                </Box>
                <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                    Seleccionar articulos
                </Typography>
                <TableContainer component={Paper} sx={{
                    overflow: 'auto',
                    height: 390
                }}>
                    <Table>
                        <TableBody>
                            {articulosFiltrados?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
                                .map((item: ArticuloManufacturado) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="center" style={{ width: '5%' }}>
                                            <Checkbox
                                                checked={selectedArticulos.some(selected => selected.articulo.id === item.id)}
                                                onChange={() => handleSelectArticulo(item)}
                                            />
                                        </TableCell>
                                        <TableCell align="center" style={{ width: '45%' }}>
                                            <img src={item.imagenes[0].url} width="100%" alt={item.denominacion} />
                                        </TableCell>
                                        <TableCell align="center" style={{ width: '50%' }}>{item.denominacion}</TableCell>
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
                        Agregar Articulos
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default AgregarArticuloModal;
