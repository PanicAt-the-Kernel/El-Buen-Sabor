import { useEffect, useState } from 'react';
import {
    Paper,
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
import { editCategoriaHija, getSubCategoriasPadre } from '../../../../servicios/CategoriaService';
import { Add, Edit, Remove } from '@mui/icons-material';
import AgregarCategoriaModal from './AgregarCategoriaModal';
import { localSession } from '../../../../servicios/localSession';

interface EditarSubCategoriasModalProps {
    iCategoria: Categoria;
}

function EditarSubCategoriasModal({ iCategoria }: EditarSubCategoriasModalProps) {
    const [subCatNoAgreg, setSubCatNoAgreg] = useState<Categoria[]>([]);
    const { data: categoriasSuc } = getSubCategoriasPadre(iCategoria.id);
    const [openNombre, setOpenNombre] = useState(false);
    const [editingSubCat, setEditingSubCat] = useState<Categoria | null>(null);
    const sucursal = localSession.getSucursal("sucursal");

    useEffect(() => {
        if (categoriasSuc) {
            const subCatAux = categoriasSuc.filter((categoria: Categoria) =>
                categoria.id !== iCategoria.id &&
                !iCategoria.subCategorias?.some((catSuc: Categoria) => catSuc.id === categoria.id)
            );
            setSubCatNoAgreg(subCatAux);
        }
    }, [categoriasSuc, iCategoria.subCategorias]);

    const handleAgregarCategoria = (categoria: Categoria) => {
        const sucursalesActualizadas = [...categoria.sucursales, sucursal];
        categoria.sucursales = sucursalesActualizadas
        editCategoriaHija(categoria);
    };

    const handleEliminarCategoria = (categoria: Categoria) => {
        const sucursalesActualizadas = categoria.sucursales.filter(suc => suc.id !== sucursal.id);
        categoria.sucursales = sucursalesActualizadas
        editCategoriaHija(categoria);
    };

    const handleOpenNombre = (subcat: Categoria) => {
        setEditingSubCat(subcat);
        setOpenNombre(true);
    };

    const handleClose = () => {
        setEditingSubCat(null);
        setOpenNombre(false);
    };

    const handleSubmitSubCat = (categoria: Categoria) => {
        if (editingSubCat != null) {
            console.log(categoria);
            editCategoriaHija(categoria);
            handleClose();
        }
    };

    return (
        <Box
            sx={{
                width: 400,
                marginTop: -1,
                marginBottom: 2,
            }}
        >
            <Paper elevation={5}>
                <Typography variant="inherit" sx={{ padding: 1, backgroundColor: "#f5f5f5" }}>
                    Subcategorías Activas
                </Typography>
                <List sx={{ backgroundColor: "white" }}>
                    {iCategoria.subCategorias?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
                        .map((item: Categoria) => (
                            <ListItem
                                key={item.id}
                                secondaryAction={
                                    <Stack direction="row" spacing={1}>
                                        <Button onClick={() => handleOpenNombre(item)} endIcon={<Edit />} />
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
            <Paper elevation={5} sx={{ marginTop: 1 }}>
                <Typography variant="inherit" sx={{ padding: 1, backgroundColor: "#f5f5f5" }}>
                    Subcategorías Inactivas
                </Typography>
                <List sx={{ backgroundColor: "white" }}>
                    {subCatNoAgreg?.sort((a, b) => a.denominacion.localeCompare(b.denominacion))
                        .map((item: Categoria) => (
                            <ListItem
                                key={item.id}
                                secondaryAction={
                                    <Stack direction="row" spacing={1}>
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
            {openNombre && editingSubCat && (
                <AgregarCategoriaModal
                    open={openNombre}
                    onClose={handleClose}
                    onSubmit={handleSubmitSubCat}
                    iCategoria={editingSubCat}
                    texto={"Editar Subcategoría"}
                />
            )}
        </Box>
    );
};

export default EditarSubCategoriasModal;