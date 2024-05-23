import BuscarProducto from "../componentes/ui/dashboard/vistaProducto/BuscarProducto";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";

function DashboardVistaProducto(){
    return(
        <DashboardLayout>
            <p></p>
            <h2>Lista de Productos</h2>
            <BuscarProducto />
        </DashboardLayout>
    )
}
export default DashboardVistaProducto;