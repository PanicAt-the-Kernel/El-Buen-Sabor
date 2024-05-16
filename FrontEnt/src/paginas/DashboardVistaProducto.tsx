import BotonAgregarProducto from "../componentes/ui/dashboard/vistaProducto/BotonAgregarProducto";
import TablaProducto from "../componentes/ui/dashboard/vistaProducto/TablaProducto";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";

function DashboardVistaProducto(){
    return(
        <DashboardLayout>
            <h1>Lista de productos</h1>
            <BotonAgregarProducto/>
            <TablaProducto/>
        </DashboardLayout>
    )
}
export default DashboardVistaProducto;