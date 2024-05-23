import React, { useState } from 'react';
import { Box, FormControl, Input, Stack } from "@mui/material";
import BotonAgregarPromocion from './BotonAgregarPromocion';
import TablaPromocion from './TablaPromocion';

function BuscarPromocion() {
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
                            placeholder="Buscar promocion"
                            id="nombrePromocion"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            sx={{ width: '300px' }}
                        />
                    </FormControl>
                </form>
                <BotonAgregarPromocion />
            </Stack>
            <p></p>
            <TablaPromocion busqueda={nombre} />
        </Box>
    );
}

export default BuscarPromocion