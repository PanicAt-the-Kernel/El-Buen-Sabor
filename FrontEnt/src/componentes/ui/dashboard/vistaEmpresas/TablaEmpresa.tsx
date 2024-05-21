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
import { handleChangePage, handleChangeRowsPerPage } from '../../../../servicios/Paginacion';

interface Empresa {
  id: number;
  nombre: string;
  razonSocial: string;
  cuil: number;
  sucursales: { id: number, nombre: string, horarioApertura: string, horarioCierre: string }[];
}

const TablaEmpresa: React.FC = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null);
  const [openAgregar, setOpenAgregar] = useState(false);
  const [openSucursal, setOpenSucursal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetch('https://buensabor-json-server.onrender.com/empresas')
      .then(response => response.json())
      .then(data => setEmpresas(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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
    console.log('Nombre:', nombre);
    console.log('Razón Social:', razonSocial);
    console.log('Cuil:', cuil);
    handleClose();
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
            {empresas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((empresa) => (
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
              count={empresas.length}
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
          initialId={editingEmpresa.id}
        />
      )}
    </>
  );
};

export default TablaEmpresa;