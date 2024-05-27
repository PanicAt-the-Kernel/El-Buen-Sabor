import { useState } from 'react';
import {
    Modal,
    Box,
    Grid,
    Button
} from '@mui/material';
import Empresa from '../../../../entidades/Empresa';
import { getSucursalesEmpresa } from '../../../../servicios/vistaInicio/FuncionesAPI';
import BotonAgregarSucursal from './BotonAgregarSucursal';
import Sucursal from '../../../../entidades/Sucursal';
import AgregarSucursalModal from './AgregarSucursalModal';
import ItemGrilla from './ItemGrilla';
import { Edit, Info } from '@mui/icons-material';

interface MostrarSucursalesModalProps {
    open: boolean;
    onClose: () => void;
    empresa: Empresa;
}

export default function MostrarSucursalesModal({ open, onClose, empresa }: MostrarSucursalesModalProps) {
    const { data: sucursales } = getSucursalesEmpresa(empresa.id);
    const [editingSucursal, setEditingSucursal] = useState<Sucursal | null>(null);
    const [openSucursal, setOpenSucursal] = useState(false);

    const handleOpen = (sucursal: Sucursal) => {
        setEditingSucursal(sucursal);
        setOpenSucursal(true);
    };

    const handleClose = () => {
        setOpenSucursal(false);
    };

    const handleSubmit = () => {
        handleClose();
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
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    minWidth: 360,
                    maxWidth: '90vw', // Para que la modal no sea demasiado ancha en pantallas pequeñas
                    maxHeight: '90vh', // Limitar la altura máxima al 90% de la altura de la ventana
                    overflow: 'auto', // Hacer que el contenido dentro del Box sea desplazable
                }}
            >
                <BotonAgregarSucursal />
                <Grid
                    container
                    spacing={1}
                    sx={{
                        marginTop: 2,
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    {sucursales?.map((item: Sucursal) => (
                        <ItemGrilla
                            nombre={item.nombre}
                            descripcion={item.domicilio.calle + " " + item.domicilio.numero + " - " + item.domicilio.localidad.nombre}
                            info={"Horario: " + item.horarioApertura + " a " + item.horarioCierre}
                            urlImagen="/imgs/empresa.jpg"
                        >
                            <Button size="small" variant="contained" color="info" startIcon={<Info />}>Ingresar</Button>
                            <Button size="small" variant="contained" startIcon={<Edit />} onClick={() => handleOpen(item)}>Editar</Button>
                        </ItemGrilla>
                    ))}
                </Grid>
                {editingSucursal && (
                    <AgregarSucursalModal
                        open={openSucursal}
                        onClose={handleClose}
                        onSubmit={handleSubmit}
                        iNombre={editingSucursal.nombre}
                        iHoraApertura={editingSucursal.horarioApertura}
                        iHoraCierre={editingSucursal.horarioCierre}
                        iEsCasaMatriz={editingSucursal.esCasaMatriz}
                        iDomicilio={editingSucursal.domicilio.calle}
                        iEmpresa={editingSucursal.empresa.nombre}
                    />
                )}
            </Box>
        </Modal >
    );
}
