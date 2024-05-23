import { useState } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { handleChangePage, handleChangeRowsPerPage } from '../../../../servicios/Paginacion';
import Empresa from '../../../../entidades/Empresa';
import { getSucursalesEmpresa } from '../../../../servicios/vistaInicio/FuncionesAPI';
import BotonAgregarSucursal from './BotonAgregarSucursal';
import Sucursal from '../../../../entidades/Sucursal';
import AgregarSucursalModal from './AgregarSucursalModal';

interface MostrarSucursalesModalProps {
    open: boolean;
    onClose: () => void;
    empresa: Empresa;
}

function MostrarSucursalesModal({ open, onClose, empresa }: MostrarSucursalesModalProps) {
    const { data: sucursales } = getSucursalesEmpresa(empresa.id);
    const [editingSucursal, setEditingSucursal] = useState<Sucursal | null>(null);
    const [openSucursal, setOpenSucursal] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 900,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <BotonAgregarSucursal />
                <p></p>
                <TableContainer component={Paper} style={{ width: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Elegir</TableCell>
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
                            {sucursales?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((sucursal) => (
                                <TableRow key={sucursal.id}>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => { }}
                                        >
                                            Elegir Sucursal
                                        </Button>
                                    </TableCell>
                                    <TableCell>{sucursal.id}</TableCell>
                                    <TableCell>{sucursal.nombre}</TableCell>
                                    <TableCell>{sucursal.horarioApertura}</TableCell>
                                    <TableCell>{sucursal.horarioCierre}</TableCell>
                                    <TableCell>{`${sucursal.domicilio.calle} ${sucursal.domicilio.numero}, ${sucursal.domicilio.localidad.nombre}`}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleOpen(sucursal)}>
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
                        count={sucursales?.length || 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => handleChangePage(event, newPage, setPage)}
                        onRowsPerPageChange={(event) => handleChangeRowsPerPage(event, setRowsPerPage, setPage)}
                    />
                </TableContainer>
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
        </Modal>
    );
};

export default MostrarSucursalesModal;