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
import { handleChangePage, handleChangeRowsPerPage } from '../../../../servicios/Paginacion';

interface Articulo {
    id: string;
    denominacion: string;
    precioVenta: string;
}

interface Categoria {
    id: string;
    denominacion: string;
    articulos: Articulo[];
}

interface MostrarArticulosModalProps {
    open: boolean;
    onClose: () => void;
    initialId: number;
}

const MostrarArticulosModal: React.FC<MostrarArticulosModalProps> = ({ open, onClose, initialId }) => {
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetch(`https://buensabor-json-server.onrender.com/categorias/${initialId}`)
            .then(response => response.json())
            .then((data: Categoria) => setArticulos(data.articulos || []))
            .catch(error => console.error('Error fetching data:', error));
    }, [initialId]);

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
                Agregar Artículo
                </Button>
                <p></p>
                <TableContainer component={Paper} style={{ width: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Artículo</TableCell>
                                <TableCell>Precio de Venta</TableCell>
                                <TableCell>Editar</TableCell>
                                <TableCell>Eliminar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {articulos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((articulo) => (
                                <TableRow key={articulo.id}>
                                    <TableCell>{articulo.id}</TableCell>
                                    <TableCell>{articulo.denominacion}</TableCell>
                                    <TableCell>{articulo.precioVenta}</TableCell>
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
                        count={articulos.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => handleChangePage(event, newPage, setPage)}
                        onRowsPerPageChange={(event) => handleChangeRowsPerPage(event, setRowsPerPage, setPage)}
                    />
                </TableContainer>
            </Box>
        </Modal>
    );
};

export default MostrarArticulosModal;