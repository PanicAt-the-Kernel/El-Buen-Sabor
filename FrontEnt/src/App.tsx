import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardVistaProducto from "./paginas/dashboardAdmin/DashboardVistaProducto";
import DashboardVistaEmpleado from "./paginas/dashboardAdmin/DashboardVistaEmpleado";
import DashboardVistaInsumo from "./paginas/dashboardAdmin/DashboardVistaInsumo";
import DashboardVistaCategoria from "./paginas/dashboardAdmin/DashboardVistaCategoria";
import DashboardVistaEmpresa from "./paginas/dashboardAdmin/DashboardVistaEmpresa";
import DashboardVistaPromocion from "./paginas/dashboardAdmin/DashboardVistaPromocion";
import DashboardVistaPedidos from "./paginas/dashboardAdmin/DashboardVistaPedidos";
import DashboardVistaInformes from "./paginas/dashboardAdmin/DashboardVistaInformes";
import DashboardVistaUMedida from "./paginas/dashboardAdmin/DashboardVistaUMedida";
import VistaPrincipal from "./paginas/cliente/VistaPrincipal";
import VistaPedidosCliente from "./paginas/cliente/VistaPedidosCliente";
import VistaCuentaCliente from "./paginas/cliente/VistaCuentaCliente";
import VistaLogin from "./paginas/cliente/VistaLogin";
import VistaRegister from "./paginas/cliente/VistaRegister";
import TiendaVistaPrincipal from "./paginas/TiendaVistaPrincipal";

import { ThemeProvider, createTheme } from "@mui/material";
import "@fontsource/montserrat"
import "@fontsource/lekton"
import "@fontsource/roboto"
import { Auth0Provider } from "@auth0/auth0-react";
import { Perfil } from "./componentes/ui/perfil/Perfil";

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
    <Auth0Provider
    domain="dev-kx011i2p7if35dr6.us.auth0.com"
    clientId="nQz3eA43DqJd7MxDpXNJxKjjuAVdA4pB"
    authorizationParams={{ redirect_uri: window.location.origin }}
    >      
 <BrowserRouter>
      <ThemeProvider theme={basilTheme}>
        <Routes>
          <Route index element={<TiendaVistaPrincipal />} />
          <Route path="/login" element={<VistaLogin />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/register" element={<VistaRegister />} />
          <Route path="/dashboard/categorias" element={<DashboardVistaCategoria />} />
          <Route path="/dashboard/informes" element={<DashboardVistaInformes />} />
          <Route path="/dashboard/productos" element={<DashboardVistaProducto />} />
          <Route path="/dashboard/empleados" element={<DashboardVistaEmpleado />} />
          <Route path="/dashboard/promociones" element={<DashboardVistaPromocion />} />
          <Route path="/dashboard/insumos" element={<DashboardVistaInsumo />} />
          <Route path="/dashboard/uDeMedida" element={<DashboardVistaUMedida />} />
          <Route path="/dashboard/pedidos" element={<DashboardVistaPedidos />} />
          <Route path="/dashboard" element={<DashboardVistaEmpresa />} />
          <Route path='/cliente/main' element={<VistaPrincipal />} />
          <Route path="/cliente/pedidos" element={<VistaPedidosCliente />} />
          <Route path="/cliente/cuenta" element={<VistaCuentaCliente />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
