import { useState } from 'react';
import { Modal, Box, TextField, Stack, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import ArticuloInsumo from '../../../../entidades/ArticuloInsumo';
import { getAllUnidadMedida, getCategoriasIdSucursal } from '../../../../servicios/vistaInicio/FuncionesAPI';

interface AgregarInsumoModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (insumo: ArticuloInsumo) => void;
    iInsumo: ArticuloInsumo;
}

function AgregarInsumoModal({ open, onClose, onSubmit, iInsumo }: AgregarInsumoModalProps) {
    const idSucursal = 1;
    const [insumo, setInsumo] = useState<ArticuloInsumo>(iInsumo);
    const [unidadMedidaL, setUnidadMedida] = useState(insumo.unidadMedida.id);
    const [categoriaL, setCategoria] = useState(insumo.categoria.id);
    const { data: unidadesMedida } = getAllUnidadMedida();
    const { data: categorias } = getCategoriasIdSucursal(idSucursal);

    const handleSubmit = () => {
        const selectedCategoria = categorias?.find(cat => cat.id === categoriaL);
        const selectedUMedida = unidadesMedida?.find(um => um.id === unidadMedidaL);

        if (!selectedCategoria || !selectedUMedida) {
            console.error("La categoría o unidad de medida seleccionados son inválidos.");
            return;
        }

        const updatedInsumo = {
            ...insumo,
            categoria: selectedCategoria,
            unidadMedida: selectedUMedida,
        };

        setInsumo(updatedInsumo);
        onSubmit(updatedInsumo);
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
                            value={insumo.denominacion}
                            onChange={(e) => setInsumo({ ...insumo, denominacion: e.target.value })}
                        />
                        <TextField
                            required
                            label="Precio de venta"
                            variant="outlined"
                            value={insumo.precioVenta}
                            onChange={(e) => setInsumo({ ...insumo, precioVenta: parseInt(e.target.value) })}
                        />
                        <FormControl variant="outlined">
                            <InputLabel id="uMedida-label">Unidad de medida</InputLabel>
                            <Select
                                labelId="uMedida-label"
                                value={unidadMedidaL}
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
                            label="Precio de compra"
                            variant="outlined"
                            value={insumo.precioCompra}
                            onChange={(e) => setInsumo({ ...insumo, precioCompra: parseInt(e.target.value) })}
                        />
                        <TextField
                            label="Stock Mínimo"
                            variant="outlined"
                            value={insumo.stockMinimo}
                            onChange={(e) => setInsumo({ ...insumo, stockMinimo: parseInt(e.target.value) })}
                        />
                        <TextField
                            label="Stock Máximo"
                            variant="outlined"
                            value={insumo.stockMaximo}
                            onChange={(e) => setInsumo({ ...insumo, stockMaximo: parseInt(e.target.value) })}
                        />
                        <TextField
                            label="Stock Actual"
                            variant="outlined"
                            value={insumo.stockActual}
                            onChange={(e) => setInsumo({ ...insumo, stockActual: parseInt(e.target.value) })}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={insumo.esParaElaborar}
                                    onChange={(e) => setInsumo({ ...insumo, esParaElaborar: e.target.checked })}
                                    name="esParaElaborar"
                                    color="primary"
                                />
                            }
                            label="Es para elaborar"
                        />
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

export default AgregarInsumoModal;