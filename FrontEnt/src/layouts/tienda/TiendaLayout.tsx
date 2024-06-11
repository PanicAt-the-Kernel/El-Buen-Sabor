import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import Usuario from "../../entidades/Usuario";
import { Login, Logout } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface TiendaSidebarTypes {
  children: ReactNode;
  setEstado: (item: boolean) => void;
  estado: boolean;
}
function TiendaLayout({ children, setEstado, estado }: TiendaSidebarTypes) {
  const [usuario, setUsuario] = useState<Usuario | null>(
    //localData.get("usuario")
  );

  const cerrarSesion = () => {
    alert("Sesión cerrada correctamente.");
    setUsuario(null);
    //localData.remove("usuario");
    window.location.reload();
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar disableGutters>
          <Box
            component="img"
            src="/imgs/Icono.svg"
            sx={{ width: 80, margin: 1 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            El Buen Sabor | Nuestros menús
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              setEstado(!estado);
            }}
          >
            <ShoppingCartIcon />
          </IconButton>
          <Stack direction="row" spacing={3} marginRight={2}>
            {usuario !== null && (
              <Link to="/dashboard" className={"btn btn-outline-light"}>
                Dashboard
              </Link>
            )}
            {usuario == null ? (
              <>
                <Link to="/login" className={"btn btn-outline-light"}>
                  Iniciar sesión / Registrarse&nbsp;
                  <Login />
                </Link>
              </>
            ) : (
              <Link
                to="#"
                className="btn btn-outline-light"
                onClick={() => cerrarSesion()}
              >
                Cerrar sesión&nbsp;
                <Logout />
              </Link>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component="main">
        <Container>{children}</Container>
      </Box>
    </>
  );
}
export default TiendaLayout;
