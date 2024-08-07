import { useState } from 'react';
import { Modal, Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableRow, Checkbox, Button, Paper } from '@mui/material';
import ArticuloManufacturadoDetalle from '../../../../entidades/ArticuloManufacturadoDetalle';
import { getAllArticuloInsumoElab } from '../../../../servicios/ArticuloInsumoService';
import ArticuloInsumo from '../../../../entidades/ArticuloInsumo';
import {localSession} from "../../../../servicios/localSession.ts";

interface AgregarInsumoModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (insumos: ArticuloManufacturadoDetalle[]) => void;
    filasActuales: ArticuloManufacturadoDetalle[];
}

function AgregarInsumoModal({ open, onClose, onSubmit, filasActuales }: AgregarInsumoModalProps) {
    const [selectedInsumos, setSelectedInsumos] = useState<ArticuloManufacturadoDetalle[]>([]);
    const { data: articulosDatos } = getAllArticuloInsumoElab(localSession.getSucursal("sucursal").id);
    const [nombreArticulo, setNombreArticulo] = useState<string>('');
    //const [nombreCategoria, setNombreCategoria] = useState<string>('');

    const detallesActivos = filasActuales.filter(fila => fila.eliminado === false);
    const articulosSinActivos = articulosDatos?.filter(articulo => !detallesActivos.map(fila => fila.articuloInsumo.id).includes(articulo.id));

    const handleSelectInsumo = (insumo: ArticuloInsumo) => {
        const estaEliminado = filasActuales.some(
            (fila) => fila.articuloInsumo.id === insumo.id && fila.eliminado == true
        );

        const index = selectedInsumos.findIndex(
            (selected) => selected.articuloInsumo.id === insumo.id
        );

        if (index == -1) {
            if (!estaEliminado) {
                const nuevoInsumo: ArticuloManufacturadoDetalle = new ArticuloManufacturadoDetalle();
                nuevoInsumo.articuloInsumo = insumo;
                nuevoInsumo.fechaBaja = "9999-12-31";
                nuevoInsumo.cantidad = 1;
                setSelectedInsumos([...selectedInsumos, nuevoInsumo]);
            } else {
                const filaEditada = filasActuales.find((fila) => fila.articuloInsumo.id === insumo.id);
                if (filaEditada) {
                    const filaEditadaCopia = { ...filaEditada, eliminado: false, fechaBaja: "9999-12-31" };
                    setSelectedInsumos([...selectedInsumos, filaEditadaCopia]);
                }
            }
        } else {
            setSelectedInsumos((prevState) => {
                const updatedArticulos = [...prevState];
                updatedArticulos.splice(index, 1);
                return updatedArticulos;
            });
        }
        console.log("Despues de seleccionar")
        console.log(selectedInsumos);
        console.log(filasActuales);
    };

    const handleSubmit = () => {
        const selectedIds = selectedInsumos.map((detalle) => detalle.id);

        const filasSinEditar = filasActuales.filter(
            (detalle) => !selectedIds.includes(detalle.id) || detalle.id === 0
        );

        const filasFinal = [...filasSinEditar, ...selectedInsumos];
        onSubmit(filasFinal);
        setSelectedInsumos([]);
        onClose();
    };

    const insumosFiltrados = articulosSinActivos?.filter((item: ArticuloInsumo) => {
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
                    Seleccionar insumos
                </Typography>
                <TableContainer component={Paper} sx={{
                    overflow: 'auto',
                    height: 390
                }}>
                    <Table>
                        <TableBody>
                            {insumosFiltrados?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
                                .map((item: ArticuloInsumo) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="center" style={{ width: '5%' }}>
                                            <Checkbox
                                                checked={selectedInsumos.some(selected => selected.articuloInsumo.id === item.id)}
                                                onChange={() => handleSelectInsumo(item)}
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
                        Agregar Insumos
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default AgregarInsumoModal;
