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
import VisibilityIcon from '@mui/icons-material/Visibility';
import AgregarEmpresaModal from './AgregarEmpresaModal';
import MostrarSucursalesModal from './MostrarSucursalesModal';

interface Product {
  id: number;
  nombre: string;
  razonSocial: string;
  cuil: number;
  categorias: { id: number, nombre: string, horarioApertura: string, horarioCierre: string }[];
}

const TablaEmpresa: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [openAgregar, setOpenAgregar] = useState(false);
  const [openSucursal, setOpenSucursal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetch('https://buensabor-json-server.onrender.com/empresas')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleOpenAgregar = (product: Product) => {
    setEditingProduct(product);
    setOpenAgregar(true);
  };

  const handleOpenSucursal = (product: Product) => {
    setEditingProduct(product);
    setOpenSucursal(true);
  };

  const handleClose = () => {
    setEditingProduct(null);
    setOpenAgregar(false);
    setOpenSucursal(false);
  };

  const handleSubmit = (nombre: string, razonSocial: string, cuil: string) => {
    console.log('Nombre:', nombre);
    console.log('Razón Social:', razonSocial);
    console.log('Cuil:', cuil);
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
              <TableCell style={{ width: '10%' }}>Id</TableCell>
              <TableCell style={{ width: '25%' }}>Nombre</TableCell>
              <TableCell style={{ width: '25%' }}>Razón Social</TableCell>
              <TableCell style={{ width: '20%' }}>CUIL</TableCell>
              <TableCell style={{ width: '10%' }}>Ver Sucursales</TableCell>
              <TableCell style={{ width: '5%' }}>Editar</TableCell>
              <TableCell style={{ width: '5%' }}>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.nombre}</TableCell>
                <TableCell>{product.razonSocial}</TableCell>
                <TableCell>{product.cuil}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenSucursal(product)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenAgregar(product)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => {
                    // Lógica para eliminar un Empresa
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
              count={products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
      </TableContainer>
      {editingProduct && (
        <AgregarEmpresaModal
          open={openAgregar}
          onClose={handleClose}
          onSubmit={handleSubmit}
          initialNombre={editingProduct.nombre}
          initialRazonSocial={editingProduct.razonSocial}
          initialCuil={editingProduct.cuil.toString()}
        />
      )} 
      {editingProduct && (
        <MostrarSucursalesModal
          open={openSucursal}
          onClose={handleClose}
          initialId={editingProduct.id}
        />
      )}
    </>
  );
};

export default TablaEmpresa;