import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  useMediaQuery,
} from "@mui/material";
import MenuOpcionesUsuario from "./MenuOpcionesUsuario";
import { ReactNode } from "react";
import { Login, Settings, ShoppingCart } from "@mui/icons-material";
import Usuario from "../../entidades/Usuario";
import { Link, Navigate } from "react-router-dom";
import { localData } from "../../servicios/vistaInicio/FuncionesAPI";

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
  //Obtener usuario
  const usuario: Usuario | null = localData.getUsuario('usuario');
  const nombreSucursal=localData.getSucursal("sucursal").nombre;

  //MediaQuery para vista escritorio
  const vistaEscritorio:boolean=useMediaQuery("(min-width:650px)");
  //Si es falso, entonces estas en vista mobile

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar sx={vistaEscritorio ? {padding:2} : {padding:1}}>
          <Box
            component="img"
            src="/imgs/Icono.svg"
            sx={vistaEscritorio ?{ width: 80 }:{width:70}}
          />
          <Box component="div" sx={{ flexGrow: 1 }}>
            <Stack>
              <Typography variant="body1">El Buen Sabor</Typography>
              <Typography variant="body2">{nombreSucursal}</Typography>
              <Link to="/cliente/bienvenida" style={{color:"white"}}><Typography variant="body2">Cambiar Sucursal</Typography></Link>
            </Stack>
          </Box>
          <Stack direction="row" spacing={1} marginRight={2}>
            {usuario == null && (
              <Link to="/dashboard" className={"btn btn-outline-light"}>
                {vistaEscritorio && "Dashboard"}
                <Settings />
              </Link>
            )}
            {usuario == null ? (
              <>
                <Link to="/login" className={"btn btn-outline-light"}>
                  {vistaEscritorio && "Iniciar sesión / Registrarse "}
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
        {children}
      </Box>
    </Box>
  );
}
