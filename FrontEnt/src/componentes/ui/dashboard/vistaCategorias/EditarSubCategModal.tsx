import { useEffect, useState } from 'react';
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
import Categoria from '../../../../entidades/Categoria';
import { getCategoriaId, getCategoriasIdSucursal } from '../../../../servicios/vistaInicio/FuncionesAPI';
import { Add, Remove } from '@mui/icons-material';

interface EditarSubCategoriasModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (subCategorias: Categoria[]) => void;
    iCategoria: Categoria;
}

function EditarSubCategoriasModal({ open, onClose, onSubmit, iCategoria }: EditarSubCategoriasModalProps) {
    const [subCategorias, setSubCategorias] = useState<Categoria[]>([]);
    const [subCatNoAgreg, setSubCatNoAgreg] = useState<Categoria[]>([]);
    const idSucursal = 1;

    useEffect(() => {
        const fetchCategoriaFull = async () => {
            const { data: categoriaFull } = await getCategoriaId(iCategoria.id);
            if (categoriaFull) {
                setSubCategorias(categoriaFull.subCategorias);
            }
        };

        fetchCategoriaFull();
    }, [iCategoria.id]);

    useEffect(() => {
        const fetchAllCategorias = async () => {
            const { data: allCategorias } = await getCategoriasIdSucursal(idSucursal);
            if (allCategorias) {
                const subCatAux = allCategorias.filter((categoria: Categoria) =>
                    !subCategorias.some((catSuc: Categoria) => catSuc.id === categoria.id)
                );
                setSubCatNoAgreg(subCatAux);
            }
        };

        fetchAllCategorias();
    }, [subCategorias]);

    const handleAgregarCategoria = (categoria: Categoria) => {
        setSubCategorias((prev) => [...prev, categoria]);
        setSubCatNoAgreg((prev) => prev.filter((cat) => cat.id !== categoria.id));
    };

    const handleEliminarCategoria = (categoria: Categoria) => {
        setSubCategorias((prev) => prev.filter((cat) => cat.id !== categoria.id));
        setSubCatNoAgreg((prev) => [...prev, categoria]);
    };

    const handleSubmit = () => {
        onSubmit(subCategorias);
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
                            Subcategorías
                        </Typography>
                        <List sx={{ backgroundColor: "white" }}>
                            {subCategorias?.map((item: Categoria) => (
                                <ListItem
                                    key={item.id}
                                    secondaryAction={
                                        <Stack direction="row" spacing={2}>
                                            <IconButton edge="end" aria-label="Eliminar" onClick={() => handleEliminarCategoria(item)}>
                                                <Remove />
                                            </IconButton>
                                        </Stack>
                                    }
                                >
                                    <ListItemText primary={item.denominacion} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                    <Paper elevation={5} sx={{ marginTop: 2 }}>
                        <Typography variant="h6" sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
                            Agregar subcategorías
                        </Typography>
                        <List sx={{ backgroundColor: "white" }}>
                            {subCatNoAgreg?.map((item: Categoria) => (
                                <ListItem
                                    key={item.id}
                                    secondaryAction={
                                        <Stack direction="row" spacing={2}>
                                            <IconButton edge="end" aria-label="Eliminar" onClick={() => handleAgregarCategoria(item)}>
                                                <Add />
                                            </IconButton>
                                        </Stack>
                                    }
                                >
                                    <ListItemText primary={item.denominacion} />
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

export default EditarSubCategoriasModal;