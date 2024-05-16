import { useState } from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
} from '@mui/material';

function TablaEmpleado() {
  const employees = [
    { id: 1, name: 'Juan Pérez', position: 'Cocinero' },
    { id: 2, name: 'Ana Gómez', position: 'Gerente' },
    { id: 3, name: 'Luis Martínez', position: 'Mozo' },
    { id: 4, name: 'Carlos López', position: 'Cajero' },
    { id: 5, name: 'Marta Fernández', position: 'Repostera' },
    { id: 6, name: 'Julia Ramírez', position: 'Mozo' },
    { id: 7, name: 'Pedro González', position: 'Mozo' },
    { id: 8, name: 'María Torres', position: 'Mozo' },
    { id: 9, name: 'Juan García', position: 'Mozo' },
    { id: 10, name: 'Laura López', position: 'Mozo' },
    { id: 11, name: 'Diego Fernández', position: 'Mozo' },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, employees.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '5%' }}>ID</TableCell>
            <TableCell style={{ width: '45%' }}>Nombre</TableCell> 
            <TableCell style={{ width: '30%' }}>Cargo</TableCell>
            <TableCell style={{ width: '20%' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
            <TableRow key={employee.id}>
              <TableCell style={{ width: '5%' }}>{employee.id}</TableCell>
              <TableCell style={{ width: '45%' }}>{employee.name}</TableCell>
              <TableCell style={{ width: '30%' }}>{employee.position}</TableCell>
              <TableCell style={{ width: '20%' }}>
                <Button color="primary">Editar</Button>
                <Button color="secondary">Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={4} />
            </TableRow>
          )}
        </TableBody>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ minWidth: 500 }}
        />
      </Box>
      </Table>
    </TableContainer>
  );
}

export default TablaEmpleado;