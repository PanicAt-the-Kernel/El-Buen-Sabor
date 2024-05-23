import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import AgregarSucursalModal from './AgregarSucursalModal';

function BotonAgregarSucursal() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
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
                Agregar sucursal
            </Button>
            <AgregarSucursalModal 
                open={open} 
                onClose={handleClose} 
                onSubmit={handleSubmit} 
                iNombre="" 
                iHoraApertura="" 
                iHoraCierre=""
                iEsCasaMatriz={false}
                iDomicilio=""
                iEmpresa=""
            />
        </>
    );
}

export default BotonAgregarSucursal;