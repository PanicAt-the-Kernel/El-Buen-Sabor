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

interface Localidad {
    nombre: string;
}

interface Domicilio {
    calle: string;
    numero: string;
    cp: string;
    piso?: string;
    nroDpto?: string;
    localidad: Localidad;
}

interface Sucursal {
    id: number;
    nombre: string;
    horarioApertura: string;
    horarioCierre: string;
    domicilio: Domicilio;
}

interface MostrarSucursalesModalProps {
    open: boolean;
    onClose: () => void;
    initialId: number;
}

const MostrarSucursalesModal: React.FC<MostrarSucursalesModalProps> = ({ open, onClose, initialId }) => {
    const [sucursales, setSucursales] = useState<Sucursal[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetch(`https://buensabor-json-server.onrender.com/empresas/${initialId}/sucursales`)
            .then(response => response.json())
            .then(data => setSucursales(data))
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
                Agregar Sucursal
                </Button>
                <p></p>
                <TableContainer component={Paper} style={{ width: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Horario de Apertura</TableCell>
                                <TableCell>Horario de Cierre</TableCell>
                                <TableCell>Domicilio</TableCell>
                                <TableCell>Editar</TableCell>
                                <TableCell>Eliminar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sucursales.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((sucursal) => (
                                <TableRow key={sucursal.id}>
                                    <TableCell>{sucursal.id}</TableCell>
                                    <TableCell>{sucursal.nombre}</TableCell>
                                    <TableCell>{sucursal.horarioApertura}</TableCell>
                                    <TableCell>{sucursal.horarioCierre}</TableCell>
                                    <TableCell>{`${sucursal.domicilio.calle} ${sucursal.domicilio.numero}, ${sucursal.domicilio.localidad.nombre}`}</TableCell>
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
                        count={sucursales.length}
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

export default MostrarSucursalesModal;