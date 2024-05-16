import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import AgregarCategoriaModal from './AgregarCategoriaModal';

function BotonAgregarCategoria() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (nombre: string, categoriaPadre: number | null) => {
        console.log('Nombre:', nombre);
        console.log('Categoria Padre:', categoriaPadre);
        handleClose();
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                onClick={handleOpen}
            >
                Agregar Categoria
            </Button>
            <AgregarCategoriaModal 
                open={open} 
                onClose={handleClose} 
                onSubmit={handleSubmit} 
                initialNombre="" 
                initialCategoriaPadre= {null} 
            />
        </>
    );
}

export default BotonAgregarCategoria;