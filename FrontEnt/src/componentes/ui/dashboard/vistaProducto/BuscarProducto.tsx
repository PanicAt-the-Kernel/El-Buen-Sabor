import React, { useState } from 'react';
import { Box, FormControl, Input, Stack } from "@mui/material";
import BotonAgregarProducto from './BotonAgregarProducto';
import TablaProducto from './TablaProducto';

function BuscarProducto() {
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
                            placeholder="Buscar producto"
                            id="nombreProducto"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            sx={{ width: '300px' }}
                        />
                    </FormControl>
                </form>
                <BotonAgregarProducto />
            </Stack>
            <p></p>
            <TablaProducto busqueda={nombre} />
        </Box>
    );
}

export default BuscarProducto