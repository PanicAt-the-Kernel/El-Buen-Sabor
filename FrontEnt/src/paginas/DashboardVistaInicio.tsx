import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import MUITabs from "../componentes/ui/dashboard/vistaInicio/MUITabs";

function DashboardVistaInicio(){
    return(
        <DashboardLayout>
            <h1>Vista Inicio</h1>
            <MUITabs/>
        </DashboardLayout>
    )
}
export default DashboardVistaInicio;