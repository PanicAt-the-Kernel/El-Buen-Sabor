import BotonAgregarEmpresa from "../componentes/ui/dashboard/vistaEmpresas/BotonAgregarEmpresa";
import BuscarEmpresa from "../componentes/ui/dashboard/vistaEmpresas/BuscarEmpresa";
import TablaEmpresa from "../componentes/ui/dashboard/vistaEmpresas/TablaEmpresa";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";

function DashboardVistaEmpresa(){
    return(
        <DashboardLayout>
            <p></p>
            <h1>Lista de empresas</h1>
            <BuscarEmpresa />
            <p></p>
            <BotonAgregarEmpresa/>
            <p></p>
            <TablaEmpresa/>
        </DashboardLayout>
    )
}
export default DashboardVistaEmpresa;