import React, { useEffect, useState } from 'react';
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

interface Category {
  id: number;
  denominacion: string;
}

const TablaCategoria: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [openCat, setOpenCat] = useState(false);
  const [openSubCat, setOpenSubCat] = useState(false);
  const [openArticulos, setOpenArticulos] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  useEffect(() => {
    fetch('https://buensabor-json-server.onrender.com/categorias')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleOpenCat = (category: Category) => {
    setEditingCategory(category);
    setOpenCat(true);
  };

  const handleOpenSubCat = (category: Category) => {
    setEditingCategory(category);
    setOpenSubCat(true);
  };

  const handleOpenArticulos = (category: Category) => {
    setEditingCategory(category);
    setOpenArticulos(true);
  };

  const handleClose = () => {
    setEditingCategory(null);
    setOpenCat(false);
    setOpenSubCat(false);
    setOpenArticulos(false);
  };

  const handleSubmit = (nombre: string) => {
    console.log('Nombre:', nombre);
    handleClose();
  };

  //@ts-ignore
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //@ts-ignore
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} style={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '5%' }}>Id</TableCell>
              <TableCell style={{ width: '40%' }}>Nombre</TableCell>
              <TableCell style={{ width: '40%' }}>Ver/Editar Subcategorías</TableCell>
              <TableCell style={{ width: '5%' }}>Ver/Editar Artículos</TableCell>
              <TableCell style={{ width: '5%' }}>Editar</TableCell>
              <TableCell style={{ width: '5%' }}>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.denominacion}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenSubCat(category)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenArticulos(category)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenCat(category)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => {
                    // Lógica para eliminar un categoryo
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
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </TableContainer>
      {editingCategory && (
        <AgregarCategoriaModal 
        open={openCat} 
        onClose={handleClose} 
        onSubmit={handleSubmit} 
        initialNombre={editingCategory.denominacion}
        />
      )}
      {editingCategory && (
        <MostrarSubCategoriasModal 
        open={openSubCat} 
        onClose={handleClose} 
        initialId={editingCategory.id}
        />
      )}
      {editingCategory && (
        <MostrarArticulosModal 
        open={openArticulos} 
        onClose={handleClose} 
        initialId={editingCategory.id}
        />
      )}
    </>
  );
};

export default TablaCategoria;