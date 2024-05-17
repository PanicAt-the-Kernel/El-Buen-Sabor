import { SearchOffOutlined } from "@mui/icons-material";
import { Button, Input, Stack } from "@mui/material";

function BuscadorEmpleado() {
    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Input
                fullWidth
                placeholder="Ingrese un valor"
                sx={{ flex: 1 }}
            />
            <Button variant="contained" color="primary">
                <SearchOffOutlined />
            </Button>
        </Stack>
    );
}

export default BuscadorEmpleado