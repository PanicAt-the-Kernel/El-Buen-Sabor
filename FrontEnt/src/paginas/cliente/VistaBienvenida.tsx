import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { getProvinciasIdPais } from "../../servicios/ProvinciaService";
import { getAllSucursales } from "../../servicios/SucursalService";
import { getLocalidadesIdProvincia } from "../../servicios/LocalidadService";
import { useState } from "react";
import FiltroSucursal from "../../componentes/ui/cliente/VistaSucursalCliente/FiltroSucursal";
import SucursalCard from "../../componentes/ui/cliente/VistaSucursalCliente/SucursalCard";
import Sucursal from "../../entidades/Sucursal";
import PostLogin from "../../auth0/PostLogin";
import getTokenAuth0 from "../../hooks/getTokenAuth0";

export default function VistaBienvenida() {
  //MediaQuery para vista escritorio
  const vistaEscritorio: boolean = useMediaQuery("(min-width:600px)");
  //Si es falso, entonces estas en vista mobile
  const token = getTokenAuth0();
  const [idProvincia, setIdProvincia] = useState<number>(0);
  const [idLocalidad, setIdLocalidad] = useState<number>(0);
  const {
    data: provincias,
    isLoading: cargaProvincias,
    error,
  } = getProvinciasIdPais(1);
  const { data: localidades, isLoading: cargaLocalidades } =
    getLocalidadesIdProvincia(idProvincia);
  const { data: sucursales, isLoading: cargaSucursales } = getAllSucursales();

  if (error) {
    return <h1>Ocurrio un error</h1>;
  }
  if (cargaProvincias || cargaLocalidades || cargaSucursales) {
    return (
      <Box
        component="div"
        sx={{
          width: "100wh",
          height: "100vh",
          backgroundImage: "url(/imgs/patronComida2.jpg)",
          backgroundSize: "auto",
        }}
      >
        <Container sx={{ padding: 2 }}>
          <Paper
            elevation={5}
            sx={{
              overflow: "hidden",
              maxHeight: 630,
              overflowY: "scroll",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "column" }}
              alignItems={"center"}
            >
              <Typography>
                Cargando las sucursales, por favor espere...
              </Typography>
              <CircularProgress />
            </Stack>
          </Paper>
        </Container>
      </Box>
    );
  }

  const sucursal = sucursales?.filter((item: Sucursal) => {
    if (idProvincia != 0 && idLocalidad != 0) {
      return (
        item.domicilio.localidad.id == idLocalidad &&
        item.domicilio.localidad.provincia.id == idProvincia
      );
    }
  });
  return (
    <>
      <Box
        component="div"
        sx={{
          width: "100wh",
          height: "100vh",
          backgroundImage: "url(/imgs/patronComida2.jpg)",
          backgroundSize: "auto",
        }}
      >
        <Container sx={{ padding: 2 }}>
          <Paper
            elevation={5}
          >
            <Stack
              direction={{ xs: "column", sm: "column" }}
              alignItems={"center"}
            >
              <Box
                component="img"
                src="/imgs/Icono.svg"
                sx={vistaEscritorio ? { maxWidth: 150 } : { maxWidth: 100 }}
              />
              <Typography
                textAlign="center"
                sx={
                  vistaEscritorio
                    ? { fontWeight: "bolder", fontSize: "17pt" }
                    : { fontWeight: "bolder", fontSize: "12pt" }
                }
              >
                Bienvenido a El Buen Sabor
              </Typography>
              <Typography
                textAlign={"center"}
                sx={
                  vistaEscritorio ? { fontSize: "14pt" } : { fontSize: "11pt" }
                }
              >
                Selecciona una provincia y localidad para buscar sucursales
              </Typography>
            </Stack>
            <FiltroSucursal
              idProvincia={idProvincia}
              idLocalidad={idLocalidad}
              setIdProvincia={setIdProvincia}
              setIdLocalidad={setIdLocalidad}
              provincias={provincias!}
              localidades={localidades!}
            />
            <Box
              sx={
                vistaEscritorio
                  ? { maxHeight: 380, overflow: "hidden", overflowY: "scroll" }
                  : { maxHeight: 330, overflow: "hidden", overflowY: "scroll" }
              }
            >
              {sucursal != undefined && sucursal.length > 0 ? (
                <Stack
                  sx={{ padding: 1 }}
                  direction={{ xs: "column", sm: "column", md: "row" }}
                  spacing={1}
                  alignItems="center"
                >
                  {sucursal?.map((item: Sucursal,index:number) => (
                    <SucursalCard key={index} sucursal={item} />
                  ))}
                </Stack>
              ) : (
                <Typography variant="h5" align="center">
                  No hay sucursales registradas con esos parametros
                </Typography>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>
      {token != null && <PostLogin />}
    </>
  );
}
