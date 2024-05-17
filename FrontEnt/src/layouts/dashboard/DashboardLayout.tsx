import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import AppHeader from "../../componentes/dashboard/AppHeader";
import Sidebar from "../../componentes/dashboard/Sidebar";
import { ReactNode, useState } from "react";
//PALETA DE COLORES DEL PROYECTO
const basilTheme = createTheme({
  palette: {
    primary: {
      main: "#356859",
      light: "#B9E4C9",
      dark: "#37966F",
      contrastText:"#ffffff"
    },
    secondary: {
      main: "#FD5523",
      light: "#FFFBE6",
      dark:"#E7D59C",
      contrastText:"#000000"
    },
  }
});

interface DashboardLayoutTypes{
  children:ReactNode;
}
function DashboardLayout({children}:DashboardLayoutTypes) {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  return (
    <ThemeProvider theme={basilTheme}>
      <CssBaseline />
      <AppHeader
        collapsed={collapsed}
        setCollapse={setCollapsed}
        broken={broken}
        setToggle={setToggled}
        toggled={toggled}
      />
      <Box
        sx={{
          display: "flex",
          height: "calc(100%-64px)",
          backgroundColor:basilTheme.palette.secondary.light
        }}
      >
        <Sidebar
          collapsed={collapsed}
          toggled={toggled}
          setBroken={setBroken}
        />
        <Box component="main">
          <Container>{/*AQUI IRAN LAS VISTAS DEL DASHBOARD */}
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default DashboardLayout;
