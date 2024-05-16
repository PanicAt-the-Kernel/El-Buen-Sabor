import BotonAgregarProducto from "../componentes/ui/dashboard/vistaProducto/BotonAgregarProducto";
import TablaProducto from "../componentes/ui/dashboard/vistaProducto/TablaProducto";
import BuscarProducto from "../componentes/ui/dashboard/vistaProducto/BuscarProducto";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";

function DashboardVistaProducto(){
    return(
        <DashboardLayout>
            <p></p>
            <h1>Lista de productos</h1>
            <BuscarProducto />
            <p></p>
            <BotonAgregarProducto/>
            <p></p>
            <TablaProducto/>
        </DashboardLayout>
    )
}
export default DashboardVistaProducto;