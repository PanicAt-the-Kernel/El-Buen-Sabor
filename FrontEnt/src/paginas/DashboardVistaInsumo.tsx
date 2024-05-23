import BuscarInsumo from "../componentes/ui/dashboard/vistaInsumos/BuscarInsumo";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";

function DashboardVistaInsumo(){
    return(
        <DashboardLayout>
            <p></p>
            <h2>Lista de Insumos</h2>
            <BuscarInsumo />
        </DashboardLayout>
    )
}
export default DashboardVistaInsumo;