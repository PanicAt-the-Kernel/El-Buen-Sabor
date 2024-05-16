import BotonAgregarInsumo from "../componentes/ui/dashboard/vistaInsumos/BotonInsumoProducto";
import TablaInsumo from "../componentes/ui/dashboard/vistaInsumos/TablaInsumo";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";

function DashboardVistaInsumo(){
    return(
        <DashboardLayout>
            <p></p>
            <h1>Lista de insumos</h1>
            <BotonAgregarInsumo/>
            <p></p>
            <TablaInsumo/>
        </DashboardLayout>
    )
}
export default DashboardVistaInsumo;