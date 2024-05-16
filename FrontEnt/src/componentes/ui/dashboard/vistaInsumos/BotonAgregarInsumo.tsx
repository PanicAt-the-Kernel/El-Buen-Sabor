import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import AgregarInsumoModal from './AgregarInsumoModal';

function BotonAgregarInsumo() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (nombre: string, precio: string, cantidad: string, imgUrl: string) => {
        console.log('Nombre:', nombre);
        console.log('Precio:', precio);
        console.log('Cantidad:', cantidad);
        console.log('URL Imagen:', imgUrl);
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
                Agregar Insumo
            </Button>
            <AgregarInsumoModal 
                open={open} 
                onClose={handleClose} 
                onSubmit={handleSubmit} 
                initialNombre="" 
                initialPrecio="" 
                initialCantidad="" 
                initialImgUrl=""
            />
        </>
    );
}

export default BotonAgregarInsumo;