import { useState } from 'react';
import { Modal, Box, TextField, Typography, Stack, Button } from '@mui/material';

interface AgregarProductoModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (nombre: string, precio: string, tiempo: string, imgUrl: string) => void;
    initialNombre: string;
    initialPrecio: string;
    initialTiempo: string;
    initialImgUrl: string;
}

function AgregarProductoModal({ open, onClose, onSubmit, initialNombre, initialPrecio, initialTiempo, initialImgUrl } : AgregarProductoModalProps) {
    const [nombre, setNombre] = useState(initialNombre);
    const [precio, setPrecio] = useState(initialPrecio);
    const [tiempo, setTiempo] = useState(initialTiempo);
    const [imgUrl, setImgUrl] = useState(initialImgUrl);

    const handleSubmit = () => {
        onSubmit(nombre, precio, tiempo, imgUrl);
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
                    Agregar Nuevo Producto
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <TextField
                        label="Precio"
                        variant="outlined"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                    <TextField
                        label="Tiempo estimado en minutos"
                        variant="outlined"
                        value={tiempo}
                        onChange={(e) => setTiempo(e.target.value)}
                    />
                    <TextField
                        label="URL Imagen"
                        variant="outlined"
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
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

export default AgregarProductoModal;