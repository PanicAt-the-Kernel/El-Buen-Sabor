import React, { useState } from 'react';
import { Box, FormControl, Input, Stack } from "@mui/material";
import BotonAgregarInsumo from './BotonAgregarInsumo';
import TablaInsumo from './TablaInsumo';

function BuscarInsumo() {
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
                            placeholder="Buscar insumo"
                            id="nombreInsumo"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            sx={{ width: '300px' }}
                        />
                    </FormControl>
                </form>
                <BotonAgregarInsumo />
            </Stack>
            <p></p>
            <TablaInsumo busqueda={nombre} />
        </Box>
    );
}

export default BuscarInsumo