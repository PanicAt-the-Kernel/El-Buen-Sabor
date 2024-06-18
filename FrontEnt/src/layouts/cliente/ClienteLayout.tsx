import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Stack,
} from "@mui/material";
import MenuOpcionesUsuario from "./MenuOpcionesUsuario";
import { ReactNode } from "react";
import { Login, ShoppingCart } from "@mui/icons-material";
import Usuario from "../../entidades/Usuario";
import { Link } from "react-router-dom";

interface ClienteLayoutTypes {
  children: ReactNode;
  setEstado: (item: boolean) => void;
  estado: boolean;
}

export default function ClienteLayout({ children, setEstado, estado }: ClienteLayoutTypes) {

  const usuario: Usuario | null = null;
  //localData.get("usuario")

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Box
            component="img"
            src="/imgs/Icono.svg"
            sx={{ width: 80, margin: 1 }}
          />
          <Typography variant="h6"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
            component={Link}
            to="/cliente/sucursal"
          >
            El Buen Sabor
          </Typography>
          <Stack direction="row" spacing={3} marginRight={2}>
            {usuario !== null && (
              <Link to="/dashboard" className={"btn btn-outline-light"}>
                Dashboard
              </Link>
            )}
            {usuario !== null ? (
              <>
                <Link to="/login" className={"btn btn-outline-light"}>
                  Iniciar sesión / Registrarse&nbsp;
                  <Login />
                </Link>
              </>
            ) : (
              <>
                <Button variant="text"
                  size="small"
                  sx={{ color: "whitesmoke" }}
                  color="primary"
                  onClick={() => { setEstado(!estado) }}
                >
                  <ShoppingCart />
                </Button>
                <MenuOpcionesUsuario />
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component="main">
        <Container>{children}</Container>
      </Box>
    </Box>
  );
}
