import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import MenuOpcionesUsuario from "./MenuOpcionesUsuario";
import { ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Login, ShoppingCart } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { getClienteEmail } from "../../servicios/ClienteService";
import { CircularProgress } from "@mui/material";
import getTokenAuth0 from "../../hooks/getTokenAuth0";
import { localSession } from "../../servicios/localSession";
import getHora from "../../hooks/getHora";

// LoginButton Component
export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  //MediaQuery para vista escritorio
  const vistaEscritorio: boolean = useMediaQuery("(min-width:650px)");
  //Si es falso, entonces estas en vista mobile

  return (
    <Link
      to="#"
      className="btn btn-outline-light"
      onClick={() => loginWithRedirect()}
    >
      {vistaEscritorio ? "Iniciar sesión / Registrarse " : ""}
      <Login />
    </Link>
  );
};

interface ClienteLayoutTypes {
  children: ReactNode;
  setEstado?: (item: boolean) => void;
  estado?: boolean;
}

export default function ClienteLayout({
  children,
  setEstado = () => {},
  estado = false,
}: ClienteLayoutTypes) {
  const navigate = useNavigate();
  const estaEnHorario=getHora();
  
  const nombreSucursal = localSession.getSucursal("sucursal").nombre;
  //MediaQuery para vista escritorio
  const vistaEscritorio: boolean = useMediaQuery("(min-width:650px)");
  //Si es falso, entonces estas en vista mobile
  const token = getTokenAuth0();
  const { user,isLoading:userLoading } = useAuth0();
  const { data,isLoading:emailLoading } = getClienteEmail(user?.email!);

  if(userLoading || emailLoading){
    return(
      <CircularProgress />
    )
  }

  if (token !=null && !data) {
    navigate("/register", { replace: true });
  } else if (token && data) {
    localSession.setCliente("Cliente", data!);
  }
  return (
    <>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar sx={vistaEscritorio ? { padding: 2 } : { padding: 1 }}>
          <Box
            component="img"
            src="/imgs/Icono.svg"
            sx={vistaEscritorio ? { width: 80 } : { width: 70 }}
          />
          <Box component="div" sx={{ flexGrow: 1 }}>
            <Stack>
              <Typography
                variant="body1"
                sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
                component={Link}
                to={`/cliente/sucursal/${localSession.getSucursal("sucursal").id}`}
              >
                El Buen Sabor
              </Typography>
              <Typography variant="body2">{nombreSucursal}</Typography>
            </Stack>
          </Box>
          <Stack direction="row" spacing={3} marginRight={2}>
            {token != null ? (
              <>
                {estaEnHorario && (
                  <Button
                    variant="text"
                    size="small"
                    sx={{ color: "whitesmoke" }}
                    color="primary"
                    onClick={() => {
                      setEstado(!estado);
                    }}
                  >
                    <ShoppingCart />
                  </Button>
                )}
                <MenuOpcionesUsuario />
              </>
            ) : (
              <LoginButton />
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component="main">{children}</Box>
    </>
  );
}
