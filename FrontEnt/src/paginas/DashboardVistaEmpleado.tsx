import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import BuscadorEmpleado from "../componentes/ui/dashboard/vistaEmpleados/BuscarEmpleado";

function DashboardVistaEmpleado() {
    return (
        <DashboardLayout>
            <p></p>
            <h2>Lista de Empleados</h2>
            <BuscadorEmpleado />
        </DashboardLayout>
    );
}

export default DashboardVistaEmpleado;