import BotonAgregarCategoria from "../componentes/ui/dashboard/vistaCategorias/BotonAgregarCategoria";
import BuscarCategoria from "../componentes/ui/dashboard/vistaCategorias/BuscarCategoria";
import TablaCategoria from "../componentes/ui/dashboard/vistaCategorias/TablaCategoria";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";

function DashboardVistaCategoria(){
    return(
        <DashboardLayout>
            <p></p>
            <h1>Lista de Categorias</h1>
            <BuscarCategoria />
            <p></p>
            <BotonAgregarCategoria/>
            <p></p>
            <TablaCategoria/>
        </DashboardLayout>
    )
}
export default DashboardVistaCategoria;