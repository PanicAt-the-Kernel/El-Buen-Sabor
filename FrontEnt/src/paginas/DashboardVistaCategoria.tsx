import BuscarCategoria from "../componentes/ui/dashboard/vistaCategorias/BuscarCategoria";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";

function DashboardVistaCategoria(){
    return(
        <DashboardLayout>
            <p></p>
            <h2>Lista de Categorias</h2>
            <BuscarCategoria />
        </DashboardLayout>
    )
}
export default DashboardVistaCategoria;