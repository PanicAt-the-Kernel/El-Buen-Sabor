import BuscarPedido from "../../componentes/ui/dashboard/vistaPedidos/BuscarPedido";
import DashboardSidebar from "../../layouts/dashboard/DashboardSidebar";

export default function DashboardVistaPedidos(){
    return(
        <DashboardSidebar>
            <BuscarPedido />
        </DashboardSidebar>
    )
}