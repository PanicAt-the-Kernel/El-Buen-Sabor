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
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
