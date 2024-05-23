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
import VisibilityIcon from '@mui/icons-material/Visibility';
import AgregarCategoriaModal from './AgregarCategoriaModal';
import MostrarSubCategoriasModal from './MostrarSubCategoriasModal';
import MostrarArticulosModal from './MostrarArticulosModal';
import { handleChangePage, handleChangeRowsPerPage } from '../../../../servicios/Paginacion';
import Categoria from '../../../../entidades/Categoria';
import { getAllCategorias } from '../../../../servicios/vistaInicio/FuncionesAPI';

interface TablaCategoriasProps {
  busqueda: string;
}

function TablaCategoria({ busqueda }: TablaCategoriasProps) {
  const { data : categorias } = getAllCategorias();
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);
  const [openCat, setOpenCat] = useState(false);
  const [openSubCat, setOpenSubCat] = useState(false);
  const [openArticulos, setOpenArticulos] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const categoriasFiltradas = categorias?.filter((item: Categoria) => {
    return (
      (busqueda === '' || item.denominacion.toLowerCase().includes(busqueda.toLowerCase()))
    );
  });

  const handleOpenCat = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setOpenCat(true);
  };

  const handleOpenSubCat = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setOpenSubCat(true);
  };

  const handleOpenArticulos = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setOpenArticulos(true);
  };

  const handleClose = () => {
    setEditingCategoria(null);
    setOpenCat(false);
    setOpenSubCat(false);
    setOpenArticulos(false);
  };

  const handleSubmit = (nombre: string) => {
    console.log('Nombre:', nombre);
    handleClose();
  };

  return (
    <>
      <TableContainer component={Paper} style={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '15%' }}>Id</TableCell>
              <TableCell style={{ width: '40%' }}>Nombre</TableCell>
              <TableCell style={{ width: '15%' }}>Ver/Editar Subcategorías</TableCell>
              <TableCell style={{ width: '20%' }}>Ver/Editar Artículos</TableCell>
              <TableCell style={{ width: '5%' }}>Editar</TableCell>
              <TableCell style={{ width: '5%' }}>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoriasFiltradas?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: Categoria) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.denominacion}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenSubCat(item)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenArticulos(item)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenCat(item)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => {
                    // Lógica para eliminar un categoriao
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
          count={categorias?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => handleChangePage(event, newPage, setPage)}
          onRowsPerPageChange={(event) => handleChangeRowsPerPage(event, setRowsPerPage, setPage)}
          />
      </TableContainer>
      {editingCategoria && (
        <AgregarCategoriaModal 
        open={openCat} 
        onClose={handleClose} 
        onSubmit={handleSubmit} 
        initialNombre={editingCategoria.denominacion}
        />
      )}
      {editingCategoria && (
        <MostrarSubCategoriasModal 
        open={openSubCat} 
        onClose={handleClose} 
        subCategorias={editingCategoria.subCategorias}
        />
      )}
      {editingCategoria && (
        <MostrarArticulosModal 
        open={openArticulos} 
        onClose={handleClose} 
        articulos={editingCategoria.articulosManofacturado}
        />
      )}
    </>
  );
};

export default TablaCategoria;