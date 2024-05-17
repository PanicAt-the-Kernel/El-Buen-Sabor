import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import AgregarProductoModal from './AgregarProductoModal';

function BotonAgregarProducto() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (nombre: string, precio: string, tiempo: string, imgUrl: string) => {
        console.log('Nombre:', nombre);
        console.log('Precio:', precio);
        console.log('Tiempo:', tiempo);
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
                Agregar Producto
            </Button>
            <AgregarProductoModal 
                open={open} 
                onClose={handleClose} 
                onSubmit={handleSubmit} 
                initialNombre="" 
                initialPrecio="" 
                initialTiempo="" 
                initialImgUrl=""
            />
        </>
    );
}

export default BotonAgregarProducto;