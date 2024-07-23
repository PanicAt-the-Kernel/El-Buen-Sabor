import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import AgregarCategoriaModal from './AgregarCategoriaModal';
import Categoria from '../../../../entidades/Categoria';
import { saveCategoriaHija } from '../../../../servicios/CategoriaService';
import { localSession } from '../../../../servicios/localSession';

interface BotonAgregarCategoriaTypes {
    categoriaPadre: Categoria;
}

export default function BotonAgregarCategoria({ categoriaPadre,
}: BotonAgregarCategoriaTypes) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = (categoria: Categoria) => {
        categoria.sucursales.push(localSession.getSucursal("sucursal"));
        saveCategoriaHija(categoria, categoriaPadre.id);
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
                Nueva SubCategoría
            </Button>
            {open && (
                <AgregarCategoriaModal
                    open={open}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    iCategoria={new Categoria}
                    texto={"Nueva SubCategoría"}
                />
            )}
        </>
    );
}