import React, { useState } from 'react';
import { Box, FormControl, Input, Stack } from "@mui/material";
import BtnAgregarEmpleado from './BtnAgregarEmpleado';
import TablaEmpleado from './TablaEmpleado';

function BuscadorEmpleado() {
    const [nombre, setNombre] = useState('');

    const handleBuscar = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <Box>
            <Stack direction="row" spacing={2} alignItems="center">
                <form onSubmit={handleBuscar}>
                    <FormControl fullWidth margin="normal">
                        <Input
                            placeholder="Buscar empleado"
                            id="nombreEmpleado"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            sx={{ width: '300px' }}
                        />
                    </FormControl>
                </form>
                <BtnAgregarEmpleado />
            </Stack>
            <p></p>
            <TablaEmpleado busqueda={nombre} />
        </Box>
    );
}

export default BuscadorEmpleado