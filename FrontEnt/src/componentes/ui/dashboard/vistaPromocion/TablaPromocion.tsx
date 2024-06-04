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
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AgregarPromocionModal from './AgregarPromocionModal';
import { handleChangePage, handleChangeRowsPerPage } from '../../../../servicios/Paginacion';
import { getAllPromociones } from '../../../../servicios/vistaInicio/FuncionesAPI';
import Promocion from '../../../../entidades/Promocion';

interface TablaPromocionsProps {
  busqueda: string;
}

function TablaPromocion({ busqueda }: TablaPromocionsProps) {
  const { data : promociones } = getAllPromociones();
  const [editingPromocion, setEditingPromocion] = useState<Promocion | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const promocionesFiltradas = promociones?.filter((item: Promocion) => {
    return (
      (busqueda === '' || item.denominacion.toLowerCase().includes(busqueda.toLowerCase()))
    );
  });

  const handleOpen = (promocion: Promocion) => {
    setEditingPromocion(promocion);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingPromocion(null);
    setOpen(false);
  };

  const handleSubmit = () => {
    handleClose();
  };

  return (
    <>
      <TableContainer component={Paper} style={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '20%' }}>Nombre</TableCell>
              <TableCell style={{ width: '30%' }}>Descripcion</TableCell>
              <TableCell style={{ width: '10%' }}>Precio Promocional</TableCell>
              <TableCell style={{ width: '10%' }}>Fecha Desde</TableCell>
              <TableCell style={{ width: '10%' }}>Fecha Hasta</TableCell>
              <TableCell style={{ width: '5%' }}>Editar</TableCell>
              <TableCell style={{ width: '5%' }}>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promocionesFiltradas?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .sort((a, b) => a.denominacion.localeCompare(b.denominacion))
            .map((promocion) => (
              <TableRow key={promocion.id}>
                <TableCell>{promocion.denominacion}</TableCell>
                <TableCell>{promocion.descripcionDescuento}</TableCell>
                <TableCell>${promocion.precioPromocional}</TableCell>
                <TableCell>{promocion.fechaDesde}</TableCell>
                <TableCell>{promocion.fechaHasta}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(promocion)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => {
                    // Lógica para eliminar un Promocion
                  }}>
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
              count={promociones?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => handleChangePage(event, newPage, setPage)}
              onRowsPerPageChange={(event) => handleChangeRowsPerPage(event, setRowsPerPage, setPage)}
            />
      </TableContainer>
      {editingPromocion && (
        <AgregarPromocionModal
          open={open} 
          onClose={handleClose} 
          onSubmit={handleSubmit} 
          iNombre={editingPromocion.denominacion}
          iDescripcion={editingPromocion.descripcionDescuento}
          iPrecio={editingPromocion.precioPromocional.toString()}
          iFechaDesde={editingPromocion.fechaDesde} 
          iFechaHasta={editingPromocion.fechaHasta}
        />
      )}
    </>
  );
};

export default TablaPromocion;