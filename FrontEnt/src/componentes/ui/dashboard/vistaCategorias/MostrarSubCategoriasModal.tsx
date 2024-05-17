import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    Modal,
    Box,
    Button,
    IconButton
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface SubCategoria {
    id: string;
    denominacion: string;
}

interface Categoria {
    id: string;
    denominacion: string;
    subCategorias: SubCategoria[];
}

interface MostrarSubCategoriasModalProps {
    open: boolean;
    onClose: () => void;
    initialId: number;
}

const MostrarSubCategoriasModal: React.FC<MostrarSubCategoriasModalProps> = ({ open, onClose, initialId }) => {
    const [subCategorias, setSubCategorias] = useState<SubCategoria[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetch(`https://buensabor-json-server.onrender.com/categorias/${initialId}`)
            .then(response => response.json())
            .then((data: Categoria) => setSubCategorias(data.subCategorias || []))
            .catch(error => console.error('Error fetching data:', error));
    }, [initialId]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                    width: 700,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                >
                Agregar Subcategoría
                </Button>
                <p></p>
                <TableContainer component={Paper} style={{ width: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Subcategoría</TableCell>
                                <TableCell>Editar</TableCell>
                                <TableCell>Eliminar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subCategorias.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((subCategoria) => (
                                <TableRow key={subCategoria.id}>
                                    <TableCell>{subCategoria.id}</TableCell>
                                    <TableCell>{subCategoria.denominacion}</TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={subCategorias.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Box>
        </Modal>
    );
};

export default MostrarSubCategoriasModal;