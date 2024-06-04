import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardVistaProducto from "./paginas/DashboardVistaProducto";
import DashboardVistaEmpleado from "./paginas/DashboardVistaEmpleado";
import DashboardVistaInsumo from "./paginas/DashboardVistaInsumo";
import DashboardVistaCategoria from "./paginas/DashboardVistaCategoria";
import DashboardVistaEmpresa from "./paginas/DashboardVistaEmpresa";
import DashboardVistaPromocion from "./paginas/DashboardVistaPromocion";
import { ThemeProvider, createTheme } from "@mui/material";

import "@fontsource/montserrat"
import "@fontsource/lekton"
import "@fontsource/roboto"
import DashboardVistaInformes from "./paginas/DashboardVistaInformes";
import DashboardVistaUMedida from "./paginas/DashboardVistaUMedida";
import VistaLogin from "./paginas/cliente/VistaLogin";
import VistaRegister from "./paginas/cliente/VistaRegister";
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
          <Route path="/login" element={<VistaLogin />} />
          <Route path="/register" element={<VistaRegister />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
