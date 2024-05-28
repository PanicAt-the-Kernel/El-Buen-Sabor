import BuscarPromocion from "../componentes/ui/dashboard/vistaPromocion/BuscarPromocion";
import DashboardSidebar from "../layouts/dashboard/DashboardSidebar";

function DashboardVistaPromocion() {
    return (
        <DashboardSidebar>
            <p></p>
            <h2>Lista de Promociones</h2>
            <BuscarPromocion />
        </DashboardSidebar>
    )
}
export default DashboardVistaPromocion;