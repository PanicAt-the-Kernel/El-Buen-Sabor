import { useState } from 'react';
import { Modal, Box, TextField, Typography, Stack, Button } from '@mui/material';

interface AgregarCategoriaModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (nombre: string) => void;
    initialNombre: string;
}

function AgregarCategoriaModal({ open, onClose, onSubmit, initialNombre }: AgregarCategoriaModalProps) {
    const [nombre, setNombre] = useState(initialNombre);

    const handleSubmit = () => {
        onSubmit(nombre);
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
                    Agregar Nueva Categoria
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
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

export default AgregarCategoriaModal;