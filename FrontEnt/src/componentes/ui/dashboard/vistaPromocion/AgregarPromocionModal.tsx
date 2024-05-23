import { useState } from 'react';
import { Modal, Box, TextField, Typography, Stack, Button } from '@mui/material';

interface AgregarPromocionModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    iNombre: string;
    iDescripcion: string;
    iPrecio: string;
    iFechaDesde: string;
    iFechaHasta: string;
}

function AgregarPromocionModal({ open, onClose, onSubmit, iNombre, iDescripcion, iPrecio, iFechaDesde, iFechaHasta }: AgregarPromocionModalProps) {
    const [nombre, setNombre] = useState(iNombre);
    const [descripcion, setDescripcion] = useState(iDescripcion);
    const [precio, setPrecio] = useState(iPrecio);
    const [fechaDesde, setFechaDesde] = useState(iFechaDesde);
    const [fechaHasta, setFechaHasta] = useState(iFechaHasta);

    const handleSubmit = () => {
        onSubmit();
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
                }}
            >
                <Typography variant="h6" id="modal-title" gutterBottom>
                    Agregar Nueva Promocion
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <TextField
                        label="Descripcion"
                        variant="outlined"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                    <TextField
                        label="Precio"
                        variant="outlined"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                    <TextField
                        label="Fecha desde"
                        variant="outlined"
                        value={fechaDesde}
                        onChange={(e) => setFechaDesde(e.target.value)}
                    />
                    <TextField
                        label="Fecha hasta"
                        variant="outlined"
                        value={fechaHasta}
                        onChange={(e) => setFechaHasta(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Guardar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default AgregarPromocionModal;