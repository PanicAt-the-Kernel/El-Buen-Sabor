import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  // Agrega más productos si es necesario
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

  return (
    <>
      <TableContainer component={Paper} style={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell><img src={product.image} alt={product.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} /></TableCell>
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