import { Box, Stack } from "@mui/material";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import BtnAgregarEmpleado from "../componentes/ui/dashboard/vistaEmpleados/BtnAgregarEmpleado";
import BuscadorEmpleado from "../componentes/ui/dashboard/vistaEmpleados/BuscadorEmpleado";
import TablaEmpleado from "../componentes/ui/dashboard/vistaEmpleados/TablaEmpleado";

function DashboardVistaEmpleado() {
    return (
        <DashboardLayout>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 2, mt: 2 }}>
                <Stack direction="row" spacing={2}>
                    <BuscadorEmpleado />
                    <BtnAgregarEmpleado />
                </Stack>
            </Box>
            <Box sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
             <Stack>
               <TablaEmpleado />
            </Stack>
             </Box>
        </DashboardLayout>
    );
}

export default DashboardVistaEmpleado;