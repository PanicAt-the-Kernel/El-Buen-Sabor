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
import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Login, Logout } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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


// LogOutButton Component
export const LogOutButton = () => {
    const { logout } = useAuth0();

    return (
        <Link to="#" className="btn btn-outline-light" onClick={()  =>  {
          logout({ logoutParams: { returnTo: window.location.origin } });
          localStorage.removeItem("userRoles");
        }}
          >
            Cerrar sesión&nbsp;
            <Logout />
        </Link>
    );
};

interface TiendaSidebarTypes {
  children: ReactNode;
  setEstado: (item: boolean) => void;
  estado: boolean;
}



function TiendaLayout({ children, setEstado, estado }: TiendaSidebarTypes) {
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
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={"btn btn-outline-light"}>
                  Dashboard
                </Link>
                <LogOutButton />
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

export default TiendaLayout;
