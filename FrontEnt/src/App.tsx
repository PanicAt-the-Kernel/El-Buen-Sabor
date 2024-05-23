import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardVistaInicio from "./paginas/DashboardVistaInicio";
import DashboardVistaProducto from "./paginas/DashboardVistaProducto";
import DashboardVistaEmpleado from "./paginas/DashboardVistaEmpleado";
import DashboardVistaInsumo from "./paginas/DashboardVistaInsumo";
import DashboardVistaCategoria from "./paginas/DashboardVistaCategoria";
import DashboardVistaEmpresa from "./paginas/DashboardVistaEmpresa";
import DashboardVistaPromocion from "./paginas/DashboardVistaPromocion";
import { ThemeProvider, createTheme } from "@mui/material";
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
});
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={basilTheme}>
        <Routes>
          <Route index element={<DashboardVistaInicio />} />
          <Route path="/empresas" element={<DashboardVistaEmpresa />} />
          <Route path="/categorias" element={<DashboardVistaCategoria />} />
          <Route path="/productos" element={<DashboardVistaProducto />} />
          <Route path="/empleados" element={<DashboardVistaEmpleado />} />
          <Route path="/promociones" element={<DashboardVistaPromocion />} />
          <Route path="/insumos" element={<DashboardVistaInsumo />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
