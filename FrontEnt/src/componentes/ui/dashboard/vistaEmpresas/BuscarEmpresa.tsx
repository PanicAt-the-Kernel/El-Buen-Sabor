import { SearchOffOutlined } from "@mui/icons-material";
import { Button, Input, Stack } from "@mui/material";

function BuscarEmpresa() {
    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Input
                fullWidth
                placeholder="Buscar empresa"
                sx={{ flex: 1 }}
            />
            <Button variant="contained" color="primary">
                <SearchOffOutlined />
            </Button>
        </Stack>
    );
}

export default BuscarEmpresa