import React, { useState } from 'react';
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
import AgregarCategoriaModal from './AgregarCategoriaModal';

interface Category {
  id: number;
  name: string;
  parentCategory: number | null;
}

const initialCategories = [
  { id: 1, name: 'Categoría 1', parentCategory: null },
  { id: 2, name: 'Categoría 2', parentCategory: null },
  { id: 3, name: 'Subcategoría 1.1', parentCategory: 1 },
  { id: 4, name: 'Subcategoría 1.2', parentCategory: 1 },
  { id: 5, name: 'Subcategoría 1.3', parentCategory: 1 },
  { id: 6, name: 'Subcategoría 2.1', parentCategory: 2 },
  { id: 7, name: 'Subcategoría 2.2', parentCategory: 2 },
  { id: 8, name: 'Subcategoría 2.3', parentCategory: 2 },
  { id: 9, name: 'Subcategoría 2.4', parentCategory: 2 },
  { id: 10, name: 'Subcategoría 2.5', parentCategory: 2 },
];

const TablaCategoria: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (category: Category) => {
    setEditingCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingCategory(null);
    setOpen(false);
  };

  const handleSubmit = (nombre: string, categoriaPadre: number | null) => {
    console.log('Nombre:', nombre);
    console.log('Categoria Padre:', categoriaPadre);
    handleClose();
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
              <TableCell style={{ width: '6%' }}>Id</TableCell>
              <TableCell style={{ width: '40%' }}>Nombre</TableCell>
              <TableCell style={{ width: '40%' }}>Categoría Padre</TableCell>
              <TableCell style={{ width: '7%' }}>Editar</TableCell>
              <TableCell style={{ width: '7%' }}>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{categories.find(cat => cat.id === category.parentCategory)?.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(category)}>
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
          count={initialCategories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </TableContainer>
      {editingCategory && (
        <AgregarCategoriaModal 
        open={open} 
        onClose={handleClose} 
        onSubmit={handleSubmit} 
        initialNombre={editingCategory.name}
        initialCategoriaPadre={editingCategory.parentCategory}
        />
      )}
    </>
  );
};

export default TablaCategoria;