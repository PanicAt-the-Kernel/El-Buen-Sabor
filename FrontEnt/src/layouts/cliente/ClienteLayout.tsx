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
import { Link, Navigate } from "react-router-dom";
import { localData } from "../../servicios/vistaInicio/FuncionesAPI";
import PostLogin from "../../auth0/PostLogin";
import LogOutButton from "../../auth0/Logout";

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
  //Si no hay sucursal seleccionada, mandar al usuario al selector
  if(localData.getSucursal("sucursal")==null){
    return(
      <Navigate to="/cliente/bienvenida" />
    )
  }

  const nombreSucursal=localData.getSucursal("sucursal").nombre;
  //MediaQuery para vista escritorio
  const vistaEscritorio:boolean=useMediaQuery("(min-width:650px)");
  //Si es falso, entonces estas en vista mobile

  const { isAuthenticated } = useAuth0();

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar sx={vistaEscritorio ? {padding:2} : {padding:1}}>
          <Box
            component="img"
            src="/imgs/Icono.svg"
            sx={vistaEscritorio ?{ width: 80 }:{width:70}}
          />
          <Box component="div" sx={{ flexGrow: 1 }}>
            <Stack>
              <Typography variant="body1" 
                sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
                component={Link}
                to="/cliente/sucursal">El Buen Sabor</Typography>
              <Typography variant="body2">{nombreSucursal}</Typography>
              <Link to="/cliente/bienvenida" style={{color:"white"}}><Typography variant="body2">Cambiar Sucursal</Typography></Link>
            </Stack>
          </Box>
          
          <Stack direction="row" spacing={3} marginRight={2}>
            {isAuthenticated ? (
              <>
                <Button variant="text"
                  size="small"
                  sx={{ color: "whitesmoke" }}
                  color="primary"
                  onClick={() => { setEstado(!estado) }}
                >
                  <ShoppingCart />
                </Button>
                <LogOutButton />
                <MenuOpcionesUsuario />
              </>
            ) : (
              <LoginButton />
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component="main">
        {children}
      </Box>
      {isAuthenticated && <PostLogin />}
    </>
  );
}

