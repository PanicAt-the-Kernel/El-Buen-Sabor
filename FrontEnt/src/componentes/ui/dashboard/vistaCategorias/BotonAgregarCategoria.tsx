import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import AgregarCategoriaModal from './AgregarCategoriaModal';
import Categoria from '../../../../entidades/Categoria';
import { saveCategoria } from '../../../../servicios/CategoriaService';
import { localSession } from '../../../../servicios/localSession';

function BotonAgregarCategoria() {
    const [open, setOpen] = useState(false);
    const idSucursal = localSession.getSucursal("sucursal").id;

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleSubmit = (categoria: Categoria) => {
        categoria.fechaBaja = "9999-12-31";
        saveCategoria(categoria, idSucursal);
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
            {open && (
                <AgregarCategoriaModal
                    open={open}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    iCategoria={new Categoria}
                />
            )}
        </>
    );
}

export default BotonAgregarCategoria;