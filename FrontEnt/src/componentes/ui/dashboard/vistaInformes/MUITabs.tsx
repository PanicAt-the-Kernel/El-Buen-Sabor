import * as React from "react";
import AlertaHolder from "./AlertaHolder";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {localSession} from "../../../../servicios/localSession.ts";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MUITabs() {
  const [value, setValue] = React.useState(0);
  const [fecha1, setFecha1] = useState("2024-06-24");
  const [fecha2, setFecha2] = useState("2024-06-24");

  const onSubmit = (e: React.SyntheticEvent, endpoint: string) => {
    e.preventDefault();
    if (new Date(fecha1) < new Date(fecha2)) {
      const url = new URL(endpoint);
      const params = new URLSearchParams();
      params.append("fechaDesde", fecha1);
      params.append("fechaHasta", fecha2);
      url.search = params.toString();
      window.location.href = url.toString();
    } else {
      alert("La fecha inicio debe ser menor a la fecha fin.");
    }
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Estadísticas" {...a11yProps(0)} />
          <Tab label="Alertas de Stock" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Container>
          <Paper elevation={6}>
            <Stack
              direction={{ sm: "column", xs: "column", md: "row" }}
              spacing={3}
              sx={{ padding: 2 }}
            >
              <TextField
                type="date"
                name="fecha1"
                label="Fecha Inicio"
                value={fecha1}
                onChange={(e) => setFecha1(e.target.value)}
              />
              <TextField
                type="date"
                name="fecha2"
                label="Fecha Fin"
                value={fecha2}
                onChange={(e) => setFecha2(e.target.value)}
              />
            </Stack>
            <Stack alignItems={"center"} sx={{padding:3}} spacing={2}>
              <Box
                component="form"
                id="form1"
                onSubmit={(e) =>
                  onSubmit(
                    e,
                    `https://traza-ending.onrender.com/estadisticas/excelIMensual/${localSession.getSucursal("sucursal").id}?`
                  )
                }
                method="GET"
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Recaudaciones Mensuales
                </Button>
              </Box>
              <Box
                component="form"
                id="form2"
                onSubmit={(e) =>
                  onSubmit(
                    e,
                    `https://traza-ending.onrender.com/estadisticas/excelIDiario/${localSession.getSucursal("sucursal").id}?`
                  )
                }
                method="GET"
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Recaudaciones Diarias
                </Button>
              </Box>
              <Box
                component="form"
                id="form3"
                onSubmit={(e) =>
                  onSubmit(
                    e,
                    `https://traza-ending.onrender.com/estadisticas/excelRanking/${localSession.getSucursal("sucursal").id}?`
                  )
                }
                method="GET"
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Ranking de comidas
                </Button>
              </Box>
              <Box
                component="form"
                id="form4"
                onSubmit={(e) =>
                  onSubmit(
                    e,
                    `https://traza-ending.onrender.com/estadisticas/excelPedidos/${localSession.getSucursal("sucursal").id}?`
                  )
                }
                method="GET"
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Pedidos por Cliente
                </Button>
              </Box>
              <Box
                component="form"
                id="form5"
                onSubmit={(e) =>
                  onSubmit(
                    e,
                    `https://traza-ending.onrender.com/estadisticas/costosGanancias/${localSession.getSucursal("sucursal").id}?`
                  )
                }
                method="GET"
              >
                <Button
                  sx={{ marginBottom: 3 }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Ganancias
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Container>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AlertaHolder />
      </CustomTabPanel>
    </Box>
  );
}
