import React, { useState } from 'react';
import {
  Box,
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
import AgregarProductoModal from './AgregarProductoModal';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Pizza Muzarella', price: 3400, quantity: 5, image: 'https://lighthouseco.work/web/image/product.template/294/image_256/%5BPIZPORMUZ%5D%20Pizza%20Porci%C3%B3n?unique=d0bbb23' },
  { id: 2, name: 'Pizza Caprese', price: 3800, quantity: 3, image: 'https://www.carriesexperimentalkitchen.com/wp-content/uploads/2017/02/Pizza.Margherita-horizontal-256x256.jpg' },
  { id: 3, name: 'Pizza Napolitana', price: 4000, quantity: 7, image: 'https://lighthouseco.work/web/image/product.template/294/image_256/%5BPIZPORMUZ%5D%20Pizza%20Porci%C3%B3n?unique=d0bbb23' },
  { id: 4, name: 'Pizza Cuatro Estaciones', price: 4200, quantity: 4, image: 'https://lighthouseco.work/web/image/product.template/294/image_256/%5BPIZPORMUZ%5D%20Pizza%20Porci%C3%B3n?unique=d0bbb23' },
  { id: 5, name: 'Pizza Barbacoa', price: 4500, quantity: 6, image: 'https://lighthouseco.work/web/image/product.template/294/image_256/%5BPIZPORMUZ%5D%20Pizza%20Porci%C3%B3n?unique=d0bbb23' },
  { id: 6, name: 'Pizza Vegetariana', price: 3700, quantity: 8, image: 'https://lighthouseco.work/web/image/product.template/294/image_256/%5BPIZPORMUZ%5D%20Pizza%20Porci%C3%B3n?unique=d0bbb23' },
  { id: 7, name: 'Pizza Hawaiana', price: 3900, quantity: 5, image: 'https://lighthouseco.work/web/image/product.template/294/image_256/%5BPIZPORMUZ%5D%20Pizza%20Porci%C3%B3n?unique=d0bbb23' },
  { id: 8, name: 'Pizza Pepperoni', price: 4100, quantity: 3, image: 'https://lighthouseco.work/web/image/product.template/294/image_256/%5BPIZPORMUZ%5D%20Pizza%20Porci%C3%B3n?unique=d0bbb23' },
  { id: 9, name: 'Pizza Mexicana', price: 4300, quantity: 6, image: 'https://lighthouseco.work/web/image/product.template/294/image_256/%5BPIZPORMUZ%5D%20Pizza%20Porci%C3%B3n?unique=d0bbb23' },
  { id: 10, name: 'Pizza Calzone', price: 4600, quantity: 4, image: 'https://lighthouseco.work/web/image/product.template/294/image_256/%5BPIZPORMUZ%5D%20Pizza%20Porci%C3%B3n?unique=d0bbb23' },
];

const TablaProducto: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (product: Product) => {
    setEditingProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingProduct(null);
    setOpen(false);
  };

  const handleSubmit = (nombre: string, precio: string, cantidad: string, imgUrl: string) => {
    console.log('Nombre:', nombre);
    console.log('Precio:', precio);
    console.log('Cantidad:', cantidad);
    console.log('URL Imagen:', imgUrl);
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
              <TableCell style={{ width: '10%' }}>Imagen</TableCell>
              <TableCell style={{ width: '50%' }}>Nombre</TableCell>
              <TableCell style={{ width: '10%' }}>Precio</TableCell>
              <TableCell style={{ width: '10%' }}>Cantidad</TableCell>
              <TableCell style={{ width: '5%' }}>Editar</TableCell>
              <TableCell style={{ width: '5%' }}>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell><img src={product.image} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'cover' }} /></TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(product)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => {
                    // Lógica para eliminar un producto
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
              count={initialProducts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
      </TableContainer>
      {editingProduct && (
        <AgregarProductoModal
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
          initialNombre={editingProduct.name}
          initialPrecio={editingProduct.price.toString()}
          initialCantidad={editingProduct.quantity.toString()}
          initialImgUrl={editingProduct.image}
        />
      )}
    </>
  );
};

export default TablaProducto;