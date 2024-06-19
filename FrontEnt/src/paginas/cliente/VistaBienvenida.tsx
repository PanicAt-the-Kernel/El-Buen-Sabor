import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  getAllSucursales,
  getLocalidadesIdProvincia,
  getProvinciasIdPais,
} from "../../servicios/vistaInicio/FuncionesAPI";

import { useState } from "react";
import FiltroSucursal from "../../componentes/ui/cliente/VistaSucursalCliente/FiltroSucursal";
import SucursalCard from "../../componentes/ui/cliente/VistaSucursalCliente/SucursalCard";
import Sucursal from "../../entidades/Sucursal";

export default function VistaBienvenida() {
  //MediaQuery para vista escritorio
  const vistaEscritorio: boolean = useMediaQuery("(min-width:600px)");
  //Si es falso, entonces estas en vista mobile

  const [idProvincia, setIdProvincia] = useState<number>(0);
  const [idLocalidad, setIdLocalidad] = useState<number>(0);
  const {
    data: provincias,
    isLoading: cargaProvincias,
    error,
  } = getProvinciasIdPais(2);
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
          backgroundImage: "url(/imgs/patronComida.jpg)",
          backgroundSize: "auto",
        }}
      >
        <Container sx={{ padding: 2 }}>
          <Paper
            elevation={5}
            sx={{
              background: "rgba(255,255,255,0.48)",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
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
    <Box
      component="div"
      sx={{
        width: "100wh",
        height: "100vh",
        backgroundImage: "url(/imgs/patronComida.jpg)",
        backgroundSize: "auto",
      }}
    >
      <Container sx={{ padding: 2 }}>
        <Paper
          elevation={5}
          sx={{
            background: "rgba(255,255,255,0.48)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
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
              sx={vistaEscritorio ? { fontSize: "14pt" } : { fontSize: "11pt" }}
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
            <Stack
              sx={{ padding: 1 }}
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={1}
              alignItems="center"
            >
              {sucursal?.map((item: Sucursal) => (
                <SucursalCard sucursal={item} />
              ))}
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
