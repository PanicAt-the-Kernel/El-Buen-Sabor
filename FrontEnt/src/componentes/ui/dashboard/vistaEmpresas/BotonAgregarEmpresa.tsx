import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import AgregarEmpresaModal from './AgregarEmpresaModal';
import { saveEmpresa } from '../../../../servicios/vistaInicio/FuncionesAPI';

function BotonAgregarEmpresa() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (nombre: string, razonSocial: string, cuil: string) => {
        //LLAMADA A FUNCION API SAVE
        saveEmpresa(nombre,razonSocial,cuil);
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
                Agregar
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