//import { useState } from 'react';
import {
    Paper,
    Modal,
    Box,
    IconButton,
    Typography,
    List,
    ListItem,
    Stack,
    ListItemText,
    Button
} from '@mui/material';
import Sucursal from '../../../../entidades/Sucursal';
import Categoria from '../../../../entidades/Categoria';
import { getCategoriaId, getSucursalesEmpresa } from '../../../../servicios/vistaInicio/FuncionesAPI';
import { Add, Remove } from '@mui/icons-material';

interface EditarSucursalesModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (sucursales: Sucursal[]) => void;
    iCategoria: Categoria;
}

function EditarSucursalesModal({ open, onClose, onSubmit, iCategoria }: EditarSucursalesModalProps) {
    //const [sucursales, setSucursales] = useState<Sucursal[] | null>(null);
    let sucursales: Sucursal[] | null = [];
    const { data: categoriaFull } = getCategoriaId(iCategoria.id);
    console.log(categoriaFull);
    if (categoriaFull) {
        //setSucursales(categoriaFull.sucursales);
        sucursales = categoriaFull.sucursales;
    }
    const idEmpresa = 1;
    const { data: allSucursales } = getSucursalesEmpresa(idEmpresa);
    //setSubSucursals(iSubSucursals);

    const sucursalesNoAgreg = allSucursales?.filter((sucursal: Sucursal) =>
        !sucursales?.some((suc: Sucursal) => suc.id === sucursal.id)
    );

    const handleAgregarSucursal = (sucursal: Sucursal) => {
        sucursales.push(sucursal);

    };

    const handleEliminarSucursal = (sucursal: Sucursal) => {
        if (sucursalesNoAgreg) {
            sucursalesNoAgreg.push(sucursal);
        }
    };

    const handleSubmit = () => {
        onSubmit(sucursales);
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
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
                    Editar Sucursales
                </Typography>
                <Box
                    component="form"
                    autoComplete="off"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <Paper elevation={5} sx={{ marginTop: 2 }}>
                        <Typography variant="h6" sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
                            Sucursales
                        </Typography>
                        <List sx={{ backgroundColor: "white" }}>
                            {sucursales?.map((item: Sucursal) => (
                                <ListItem
                                    key={item.id}
                                    secondaryAction={
                                        <Stack direction="row" spacing={2}>
                                            <IconButton edge="end" aria-label="Eliminar" onClick={() => handleEliminarSucursal(item)}>
                                                <Remove />
                                            </IconButton>
                                        </Stack>
                                    }
                                >
                                    <ListItemText primary={item.nombre} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                    <Paper elevation={5} sx={{ marginTop: 2 }}>
                        <Typography variant="h6" sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
                            Agregar sucursales
                        </Typography>
                        <List sx={{ backgroundColor: "white" }}>
                            {sucursalesNoAgreg?.map((item: Sucursal) => (
                                <ListItem
                                    key={item.id}
                                    secondaryAction={
                                        <Stack direction="row" spacing={2}>
                                            <IconButton edge="end" aria-label="Eliminar" onClick={() => handleAgregarSucursal(item)}>
                                                <Add />
                                            </IconButton>
                                        </Stack>
                                    }
                                >
                                    <ListItemText primary={item.nombre} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                    <Button variant="contained" color="primary" type="submit" style={{ margin: 25 }}>
                        Guardar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={onClose} style={{ margin: 25}}>
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditarSucursalesModal;