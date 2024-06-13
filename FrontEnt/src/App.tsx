import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardVistaProducto from "./paginas/dashboardAdmin/DashboardVistaProducto";
import DashboardVistaEmpleado from "./paginas/dashboardAdmin/DashboardVistaEmpleado";
import DashboardVistaInsumo from "./paginas/dashboardAdmin/DashboardVistaInsumo";
import DashboardVistaCategoria from "./paginas/dashboardAdmin/DashboardVistaCategoria";
import DashboardVistaEmpresa from "./paginas/dashboardAdmin/DashboardVistaEmpresa";
import DashboardVistaPromocion from "./paginas/dashboardAdmin/DashboardVistaPromocion";
import { ThemeProvider, createTheme } from "@mui/material";

import "@fontsource/montserrat"
import "@fontsource/lekton"
import "@fontsource/roboto"
import DashboardVistaInformes from "./paginas/dashboardAdmin/DashboardVistaInformes";
import DashboardVistaUMedida from "./paginas/dashboardAdmin/DashboardVistaUMedida";
import VistaProductosCliente from "./paginas/cliente/VistaProductosCliente";
import VistaPedidosCliente from "./paginas/cliente/VistaPedidosCliente";
import VistaCuentaCliente from "./paginas/cliente/VistaCuentaCliente";
import VistaLogin from "./paginas/cliente/VistaLogin";
import VistaDomicilioCliente from "./paginas/cliente/VistaDomicilioCliente";
import VistaBienvenida from "./paginas/cliente/VistaBienvenida";
//PALETA DE COLORES DEL PROYECTO
const basilTheme = createTheme({
  palette: {
    primary: {
      main: "#356859",
      light: "#B9E4C9",
      dark: "#37966F",
      contrastText: "#ffffff",

    },
    secondary: {
      main: "#FD5523",
      light: "#FFFBE6",
      dark: "#E7D59C",
      contrastText: "#000000",
    },
  },
  typography:{
    fontFamily:[
      "montserrat",
      "lekton",
      "roboto"
    ].join(","),
  }
});
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={basilTheme}>
        <Routes>
          <Route index element={<DashboardVistaEmpresa />} />
          <Route path="/categorias" element={<DashboardVistaCategoria />} />
          <Route path="/informes" element={<DashboardVistaInformes />} />
          <Route path="/productos" element={<DashboardVistaProducto />} />
          <Route path="/empleados" element={<DashboardVistaEmpleado />} />
          <Route path="/promociones" element={<DashboardVistaPromocion />} />
          <Route path="/insumos" element={<DashboardVistaInsumo />} />
          <Route path="/uDeMedida" element={<DashboardVistaUMedida />} />
          {/*VISTA DE CLIENTE*/}
          <Route path="/cliente/bienvenida" element={<VistaBienvenida />} />
          <Route path='/cliente/sucursal' element={<VistaProductosCliente />} />
          <Route path="/cliente/pedidos" element={<VistaPedidosCliente />} />
          <Route path="/cliente/cuenta" element={<VistaCuentaCliente />} />
          <Route path="/login" element={<VistaLogin />} />
          <Route path="/cliente/domicilios" element={<VistaDomicilioCliente />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
