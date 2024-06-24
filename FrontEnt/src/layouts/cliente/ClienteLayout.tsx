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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getClienteEmail, localData } from "../../servicios/vistaInicio/FuncionesAPI";
import LogOutButton from "../../auth0/Logout";
import moment from 'moment-timezone';
import { CircularProgress } from '@mui/material';

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
  setEstado?: (item: boolean) => void;
  estado?: boolean;
}

export default function ClienteLayout({ children, setEstado=()=>{}, estado=false }: ClienteLayoutTypes) {  
  const navigate = useNavigate();  
  //Si no hay sucursal seleccionada, mandar al usuario al selector
  if (localData.getSucursal("sucursal") == null) {
    return (
      <Navigate to="/cliente/bienvenida" />
    )
  }
  
  const now = moment().tz('America/Argentina/Buenos_Aires');

  const isWithinTimeRange = () => {
    const dayOfWeek = now.day(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
    const hour = now.hour();
    const minute = now.minute();

    // Horarios de lunes a viernes (20:00 - 00:00)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      if ((hour === 20 && minute >= 0) || (hour >= 0 && hour < 24)) {
        return true;
      }
    }

    // Horarios de sábados y domingos (11:00 - 15:00 y 20:00 - 00:00)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      if ((hour === 11 && minute >= 0) || (hour >= 12 && hour < 15) || 
          (hour === 20 && minute >= 0) || (hour >= 0 && hour < 24)) {
        return true;
      }
    }

    return false;
  };

  const nombreSucursal = localData.getSucursal("sucursal").nombre;
  //MediaQuery para vista escritorio
  const vistaEscritorio: boolean = useMediaQuery("(min-width:650px)");
  //Si es falso, entonces estas en vista mobile
  const { isAuthenticated, user} = useAuth0();

  if(isAuthenticated) {
    //@ts-ignore
    const { data, isLoading, error } = getClienteEmail(user.email);
    if (isLoading)
      return (
        <>
          <CircularProgress color="inherit" />
        </>
      );
      if (error) {
        <h1>
        Ups! Ocurrio un error al obtener los menús. Reintente nuevamente en
        unos minutos
      </h1>
      }
  
      if(isAuthenticated && data) {
        localData.setCliente("Cliente",data);
      } else if( isAuthenticated && !data) {
        navigate("/register", { replace: true });
        console.log("hola");
      } 
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
              <Typography variant="body1"
                sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
                component={Link}
                to={`/cliente/sucursal/${localData.getSucursal("sucursal").id}`}>El Buen Sabor</Typography>
              <Typography variant="body2">{nombreSucursal}</Typography>
              <Link to="/cliente/bienvenida" style={{ color: "white" }}><Typography variant="body2">Cambiar Sucursal</Typography></Link>
            </Stack>
          </Box>
          <Stack direction="row" spacing={3} marginRight={2}>
          {isAuthenticated ? (
              <>
                {isWithinTimeRange() && (
                  <Button variant="text"
                    size="small"
                    sx={{ color: "whitesmoke" }}
                    color="primary"
                    onClick={() => { setEstado(!estado) }}
                  >
                    <ShoppingCart />
                  </Button>
                )}
                <MenuOpcionesUsuario />
                <LogOutButton />
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
    </>
  );
}

