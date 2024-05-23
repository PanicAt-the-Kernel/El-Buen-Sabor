import BuscarEmpresa from "../componentes/ui/dashboard/vistaEmpresas/BuscarEmpresa";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";

function DashboardVistaEmpresa(){
    return(
        <DashboardLayout>
            <p></p>
            <h2>Lista de Empresas</h2>
            <BuscarEmpresa />
        </DashboardLayout>
    )
}
export default DashboardVistaEmpresa;