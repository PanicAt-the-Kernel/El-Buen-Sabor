import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from "@mui/material/Button"

function BtnAgregarEmpleado() {
    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
        >
            Agregar Empleado
        </Button>
    )
}

export default BtnAgregarEmpleado