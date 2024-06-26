import * as React from "react";
import AlertaHolder from "./AlertaHolder";
import { Box, Button, Container, Paper, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";

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
  const [fecha1, setFecha1] = useState("1/01/2020");
  const [fecha2, setFecha2] = useState("1/01/2020");

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (fecha1 === "1/01/2020" && fecha2 === "1/01/2020") {
      window.location.replace("http://localhost:8080/"); //endpoint back -> nico
    } else {
      let date1 = new Date(fecha1);
      let date2 = new Date(fecha2);
      if (date1.getTime() < date2.getTime()) {
        const form = document.getElementById("form") as HTMLFormElement;
        form.submit();
      } else {
        alert("La fecha 1 debe ser menor a la fecha 2")
        return null;
      }

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
            <Box
              component="form"
              id="form"
              onSubmit={(e) => onSubmit(e)}
              action="http://localhost:8080/pedidos/exportExcel"
              method="POST"
              sx={{
                padding: 5,
                margin: 3
              }}
            >
              <Stack
                direction="column"
                spacing={3}
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
                <Button sx={{ marginBottom: 3 }} variant="contained" color="primary" type="submit">
                  Generar Excel
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AlertaHolder />
      </CustomTabPanel>
    </Box>
  );
}
