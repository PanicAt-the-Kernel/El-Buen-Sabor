import BuscarPromocion from "../componentes/ui/dashboard/vistaPromocion/BuscarPromocion";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";

function DashboardVistaPromocion(){
    return(
        <DashboardLayout>
            <p></p>
            <h2>Lista de Promociones</h2>
            <BuscarPromocion />
        </DashboardLayout>
    )
}
export default DashboardVistaPromocion;