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
import AgregarProductoModal from './AgregarProductoModal';
import { handleChangePage, handleChangeRowsPerPage } from '../../../../servicios/Paginacion';
import { getAllArticulosManufacturados } from '../../../../servicios/vistaInicio/FuncionesAPI';
import ArticuloManufacturado from '../../../../entidades/ArticuloManufacturado';

interface TablaProductosProps {
  busqueda: string;
}

function TablaProducto({ busqueda }: TablaProductosProps) {
  const { data : products } = getAllArticulosManufacturados();
  const [editingProduct, setEditingProduct] = useState<ArticuloManufacturado | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const productosFiltrados = products?.filter((item: ArticuloManufacturado) => {
    return (
      (busqueda === '' || item.denominacion.toLowerCase().includes(busqueda.toLowerCase()))
    );
  });

  const handleOpen = (product: ArticuloManufacturado) => {
    setEditingProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingProduct(null);
    setOpen(false);
  };

  const handleSubmit = (nombre: string, precio: string, tiempo: string, imgUrl: string) => {
    console.log('Nombre:', nombre);
    console.log('Precio:', precio);
    console.log('Tiempo:', tiempo);
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
              <TableCell style={{ width: '10%' }}>Tiempo estimado en minutos</TableCell>
              <TableCell style={{ width: '5%' }}>Editar</TableCell>
              <TableCell style={{ width: '5%' }}>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productosFiltrados?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell><img src={product.imagenes[0].url} alt={product.denominacion} style={{ width: '60px', height: '60px', objectFit: 'cover' }} /></TableCell>
                <TableCell>{product.denominacion}</TableCell>
                <TableCell>${product.precioVenta}</TableCell>
                <TableCell>{product.tiempoEstimadoMinutos}</TableCell>
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
              count={products?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => handleChangePage(event, newPage, setPage)}
              onRowsPerPageChange={(event) => handleChangeRowsPerPage(event, setRowsPerPage, setPage)}
            />
      </TableContainer>
      {editingProduct && (
        <AgregarProductoModal
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
          initialNombre={editingProduct.denominacion}
          initialPrecio={editingProduct.precioVenta.toString()}
          initialTiempo={editingProduct.tiempoEstimadoMinutos.toString()}
          initialImgUrl={editingProduct.imagenes[0].url}
        />
      )}
    </>
  );
};

export default TablaProducto;