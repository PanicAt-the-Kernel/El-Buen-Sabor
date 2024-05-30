import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import AgregarInsumoModal from './AgregarInsumoModal';
import ArticuloInsumo from '../../../../entidades/ArticuloInsumo';
import { saveArticuloInsumo } from '../../../../servicios/vistaInicio/FuncionesAPI';

function BotonAgregarInsumo() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (insumo: ArticuloInsumo) => {
        saveArticuloInsumo(insumo);
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
                Agregar insumo
            </Button>
            <AgregarInsumoModal 
                open={open} 
                onClose={handleClose} 
                onSubmit={handleSubmit} 
                iInsumo={new ArticuloInsumo}
            />
        </>
    );
}

export default BotonAgregarInsumo;