import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Stack,
  CssBaseline,
} from "@mui/material";
import MenuOpcionesUsuario from "./MenuOpcionesUsuario";
import { ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Login, ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import PostLogin from "../../auth0/PostLogin";
import RoleRedirect from "../../auth0/RoleRedirect";

// LoginButton Component
export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Link to="#" className="btn btn-outline-light" onClick={() => loginWithRedirect()}>
      Iniciar sesión / Registrarse&nbsp;
      <Login />
    </Link>
  );
};

interface ClienteLayoutTypes {
  children: ReactNode;
  setEstado: (item: boolean) => void;
  estado: boolean;
}

export default function ClienteLayout({ children, setEstado, estado }: ClienteLayoutTypes) {
  const { isAuthenticated } = useAuth0();

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
          <Typography variant="h6"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
            component={Link}
            to="/cliente/sucursal"
          >
            El Buen Sabor
          </Typography>
          <Stack direction="row" spacing={3} marginRight={2}>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={"btn btn-outline-light"}>
                  Dashboard
                </Link>
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
            ) : (
              <LoginButton />
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component="main">
        <Container>{children}</Container>
      </Box>
      {isAuthenticated && <PostLogin />}
      {isAuthenticated && <RoleRedirect />}
    </>
  );
}
