import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardVistaProducto from "./paginas/DashboardVistaProducto";
import DashboardVistaEmpleado from "./paginas/DashboardVistaEmpleado";
import DashboardVistaInsumo from "./paginas/DashboardVistaInsumo";
import DashboardVistaCategoria from "./paginas/DashboardVistaCategoria";
import DashboardVistaEmpresa from "./paginas/DashboardVistaEmpresa";
import DashboardVistaPromocion from "./paginas/DashboardVistaPromocion";
import DashboardVistaInformes from "./paginas/DashboardVistaInformes";
import DashboardVistaUMedida from "./paginas/DashboardVistaUMedida";
import VistaLogin from "./paginas/cliente/VistaLogin";
import VistaRegister from "./paginas/cliente/VistaRegister";
import TiendaVistaPrincipal from "./paginas/TiendaVistaPrincipal";
import { ThemeProvider, createTheme } from "@mui/material";

import "@fontsource/montserrat"
import "@fontsource/lekton"
import "@fontsource/roboto"
import DashboardVistaPedidos from "./paginas/DashboardVistaPedidos";

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
          <Route index element={<TiendaVistaPrincipal />} />
          <Route path="/login" element={<VistaLogin />} />
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
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
