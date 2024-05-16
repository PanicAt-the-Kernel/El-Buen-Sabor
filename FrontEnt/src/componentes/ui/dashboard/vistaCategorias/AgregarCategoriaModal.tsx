import React, { useState } from 'react';
import { Modal, Box, TextField, Typography, Stack, Button } from '@mui/material';

interface AgregarCategoriaModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (nombre: string, categoriaPadre: number | null) => void;
    initialNombre: string;
    initialCategoriaPadre: number | null;
}

const AgregarCategoriaModal: React.FC<AgregarCategoriaModalProps> = ({ open, onClose, onSubmit, initialNombre, initialCategoriaPadre }) => {
    const [nombre, setNombre] = useState(initialNombre);
    const [categoriaPadre, setCategoriaPadre] = useState(initialCategoriaPadre);

    const handleSubmit = () => {
        onSubmit(nombre, categoriaPadre);
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
                    Agregar Nuevo Categoria
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <TextField
                        label="Id Categoría Padre"
                        variant="outlined"
                        value={categoriaPadre}
                        onChange={(e) => setCategoriaPadre(parseInt(e.target.value))}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Guardar
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default AgregarCategoriaModal;