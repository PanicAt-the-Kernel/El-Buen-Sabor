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
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AgregarInsumoModal from './AgregarInsumoModal';
import { handleChangePage, handleChangeRowsPerPage } from '../../../../servicios/Paginacion';

interface Insumo {
  id: number;
  denominacion: string;
  precioVenta: number;
  stockActual: number;
  imagenes: { id: number, url: string }[];
}

const TablaInsumo: React.FC = () => {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [editingInsumo, setEditingInsumo] = useState<Insumo | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetch('https://buensabor-json-server.onrender.com/articulosInsumos')
      .then(response => response.json())
      .then(data => setInsumos(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleOpen = (insumo: Insumo) => {
    setEditingInsumo(insumo);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingInsumo(null);
    setOpen(false);
  };

  const handleSubmit = (nombre: string, precio: string, cantidad: string, imgUrl: string) => {
    console.log('Nombre:', nombre);
    console.log('Precio:', precio);
    console.log('Cantidad:', cantidad);
    console.log('URL Imagen:', imgUrl);
    handleClose();
  };

  return (
    <>
      <TableContainer component={Paper} style={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '10%' }}>Imagen</TableCell>
              <TableCell style={{ width: '50%' }}>Nombre</TableCell>
              <TableCell style={{ width: '10%' }}>Precio</TableCell>
              <TableCell style={{ width: '10%' }}>Stock Actual</TableCell>
              <TableCell style={{ width: '5%' }}>Editar</TableCell>
              <TableCell style={{ width: '5%' }}>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {insumos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((insumo) => (
              <TableRow key={insumo.id}>
                <TableCell><img src={insumo.imagenes[0].url} alt={insumo.denominacion} style={{ width: '60px', height: '60px', objectFit: 'cover' }} /></TableCell>
                <TableCell>{insumo.denominacion}</TableCell>
                <TableCell>${insumo.precioVenta}</TableCell>
                <TableCell>{insumo.stockActual}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(insumo)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => {
                    // Lógica para eliminar un Insumo
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
              count={insumos.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => handleChangePage(event, newPage, setPage)}
              onRowsPerPageChange={(event) => handleChangeRowsPerPage(event, setRowsPerPage, setPage)}
            />
      </TableContainer>
      {editingInsumo && (
        <AgregarInsumoModal
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
          initialNombre={editingInsumo.denominacion}
          initialPrecio={editingInsumo.precioVenta.toString()}
          initialCantidad={editingInsumo.stockActual.toString()}
          initialImgUrl={editingInsumo.imagenes[0].url}
        />
      )}
    </>
  );
};

export default TablaInsumo;