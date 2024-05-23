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
import AgregarEmpresaModal from './AgregarEmpresaModal';
import MostrarSucursalesModal from './MostrarSucursalesModal';
import { handleChangePage, handleChangeRowsPerPage } from '../../../../servicios/Paginacion';
import { editEmpresa, getAllEmpresas } from '../../../../servicios/vistaInicio/FuncionesAPI';
import Empresa from '../../../../entidades/Empresa';

interface TablaProductosProps {
  busqueda: string;
}

function TablaEmpresa({ busqueda }: TablaProductosProps) {
  const { data : empresas } = getAllEmpresas();
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null);
  const [openAgregar, setOpenAgregar] = useState(false);
  const [openSucursal, setOpenSucursal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const empresasFiltradas = empresas?.filter((item: Empresa) => {
    return (
      (busqueda === '' || item.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    );
  });

  const handleOpenAgregar = (empresa: Empresa) => {
    setEditingEmpresa(empresa);
    setOpenAgregar(true);
  };

  const handleOpenSucursal = (empresa: Empresa) => {
    setEditingEmpresa(empresa);
    setOpenSucursal(true);
  };

  const handleClose = () => {
    setEditingEmpresa(null);
    setOpenAgregar(false);
    setOpenSucursal(false);
  };

  const handleSubmit = (nombre: string, razonSocial: string, cuil: string) => {
    //LLAMADA API EDITAR EMPRESA
    if(editingEmpresa!=null){
      editEmpresa(editingEmpresa.id,nombre,razonSocial,cuil);
      handleClose();
    }
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
            {empresasFiltradas?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((empresa) => (
              <TableRow key={empresa.id}>
                <TableCell>{empresa.id}</TableCell>
                <TableCell>{empresa.nombre}</TableCell>
                <TableCell>{empresa.razonSocial}</TableCell>
                <TableCell>{empresa.cuil}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenSucursal(empresa)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenAgregar(empresa)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => {
                    // Lógica para eliminar una empresa
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
              count={empresas?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => handleChangePage(event, newPage, setPage)}
              onRowsPerPageChange={(event) => handleChangeRowsPerPage(event, setRowsPerPage, setPage)}
            />
      </TableContainer>
      {editingEmpresa && (
        <AgregarEmpresaModal
          open={openAgregar}
          onClose={handleClose}
          onSubmit={handleSubmit}
          initialNombre={editingEmpresa.nombre}
          initialRazonSocial={editingEmpresa.razonSocial}
          initialCuil={editingEmpresa.cuil.toString()}
        />
      )} 
      {editingEmpresa && (
        <MostrarSucursalesModal
          open={openSucursal}
          onClose={handleClose}
          empresa={editingEmpresa}
        />
      )}
    </>
  );
};

export default TablaEmpresa;