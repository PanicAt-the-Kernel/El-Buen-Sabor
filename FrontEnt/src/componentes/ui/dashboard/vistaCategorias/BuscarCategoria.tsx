import React, { useState } from 'react';
import { Box, FormControl, Input, Stack } from "@mui/material";
import TablaCategoria from './TablaCategoria';
import BotonAgregarCategoria from './BotonAgregarCategoria';

function BuscarCategoria() {
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
                            placeholder="Buscar categoría"
                            id="nombreCategoria"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            sx={{ width: '300px' }}
                        />
                    </FormControl>
                </form>
                <BotonAgregarCategoria />  
            </Stack>
            <p></p>
            <TablaCategoria busqueda={nombre} />
        </Box>
    );
}

export default BuscarCategoria;