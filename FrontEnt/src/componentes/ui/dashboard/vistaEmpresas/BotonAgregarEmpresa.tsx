import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import AgregarEmpresaModal from './AgregarEmpresaModal';

function BotonAgregarEmpresa() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (nombre: string, razonSocial: string, cuil: string) => {
        console.log('Nombre:', nombre);
        console.log('Precio:', razonSocial);
        console.log('Tiempo:', cuil);
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
                Agregar Empresa
            </Button>
            <AgregarEmpresaModal 
                open={open} 
                onClose={handleClose} 
                onSubmit={handleSubmit} 
                initialNombre="" 
                initialRazonSocial="" 
                initialCuil=""
            />
        </>
    );
}

export default BotonAgregarEmpresa;