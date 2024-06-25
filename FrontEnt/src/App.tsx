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
import VistaProductosCliente from "./paginas/cliente/VistaProductosCliente";
import VistaPedidosCliente from "./paginas/cliente/VistaPedidosCliente";
import VistaCuentaCliente from "./paginas/cliente/VistaCuentaCliente";
import VistaLogin from "./paginas/cliente/VistaLogin";
import VistaDomicilioCliente from "./paginas/cliente/VistaDomicilioCliente";
import VistaBienvenida from "./paginas/cliente/VistaBienvenida";
import MercadoPagoSuccess from "./paginas/cliente/MercadoPagoSuccess";
import MercadoPagoError from "./paginas/cliente/MercadoPagoError";
import MercadoPagoPending from "./paginas/cliente/MercadoPagoPending";
import { Auth0Provider } from "@auth0/auth0-react";
import { Perfil } from "./componentes/ui/perfil/Perfil";
import VistaRegister from "./paginas/cliente/VistaRegister";

import { ThemeProvider, createTheme } from "@mui/material";
import "@fontsource/montserrat"
import "@fontsource/lekton"
import "@fontsource/roboto"
import VistaPedidoCliente from "./paginas/cliente/VistaPedidoCliente";
import { localData } from "./servicios/vistaInicio/FuncionesAPI";
import { useEffect, useState } from "react";
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
  typography: {
    fontFamily: [
      "montserrat",
      "lekton",
      "roboto"
    ].join(","),
  }
});

function App() {

  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const userRoles = localData.getRol("userRoles");
    setUserRoles(userRoles);
  });
 
  return (
    <Auth0Provider
    domain="dev-8qdogwh8uubh8qgz.us.auth0.com"
    clientId="xhMHc3nocA0726QD697jsJlVdTkXXJdB"
     authorizationParams={{ audience:'https://Auth0Example.com' ,redirect_uri: window.location.origin }}
    cacheLocation="localstorage"
    >      
 <BrowserRouter>
      <ThemeProvider theme={basilTheme}>
        <Routes>
          <Route index element={<VistaBienvenida />} />
          {/*VISTA DE DASHBOARD*/}
          <Route path="/dashboard" element={ userRoles.includes("ADMIN") ? <DashboardVistaEmpresa /> : <VistaBienvenida />} />
          <Route path="/dashboard/categorias" element={userRoles.includes("ADMIN") ? <DashboardVistaCategoria /> : <VistaBienvenida />} />
          <Route path="/dashboard/informes" element={userRoles.includes("ADMIN") ?  <DashboardVistaInformes /> : <VistaBienvenida />} />
          <Route path="/dashboard/productos" element={userRoles.includes("ADMIN") ? <DashboardVistaProducto /> : <VistaBienvenida />} />
          <Route path="/dashboard/empleados" element={userRoles.includes("ADMIN") ? <DashboardVistaEmpleado /> : <VistaBienvenida />} />
          <Route path="/dashboard/promociones" element={userRoles.includes("ADMIN") ? <DashboardVistaPromocion />: <VistaBienvenida />} />
          <Route path="/dashboard/insumos" element={userRoles.includes("ADMIN") ? <DashboardVistaInsumo /> : <VistaBienvenida />} />
          <Route path="/dashboard/uDeMedida" element={userRoles.includes("ADMIN") ? <DashboardVistaUMedida />: <VistaBienvenida />} />
          <Route path="/dashboard/pedidos" element={(userRoles.some(role => ["ADMIN", "COCINERO", "CAJERO", "DELIVERY"].includes(role))) ?   <DashboardVistaPedidos /> : <VistaBienvenida />} />
          {/*VISTA DE CLIENTE*/}
          <Route path="/register" element={<VistaRegister />} />
          <Route path="/login" element={<VistaLogin />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/cliente/bienvenida" element={<VistaBienvenida />} />
          <Route path='/cliente/sucursal/:id' element={<VistaProductosCliente />} />
          <Route path="/cliente/pedidos" element={<VistaPedidosCliente />} />
          <Route path="/cliente/cuenta" element={<VistaCuentaCliente />} />
          <Route path="/cliente/domicilios" element={<VistaDomicilioCliente />} />
          <Route path="/cliente/miPedido" element={<VistaPedidoCliente />} />
          <Route path="/cliente/mpExito" element={<MercadoPagoSuccess />} />
          <Route path="/cliente/mpError" element={<MercadoPagoError />} />
          <Route path="/cliente/mpPending" element={<MercadoPagoPending />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
