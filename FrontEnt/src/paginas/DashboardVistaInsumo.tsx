import BotonAgregarInsumo from "../componentes/ui/dashboard/vistaInsumos/BotonInsumoProducto";
import BuscarInsumo from "../componentes/ui/dashboard/vistaInsumos/BuscarInsumo";
import TablaInsumo from "../componentes/ui/dashboard/vistaInsumos/TablaInsumo";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";

function DashboardVistaInsumo(){
    return(
        <DashboardLayout>
            <p></p>
            <h1>Lista de insumos</h1>
            <BuscarInsumo />
            <p></p>
            <BotonAgregarInsumo/>
            <p></p>
            <TablaInsumo/>
        </DashboardLayout>
    )
}
export default DashboardVistaInsumo;