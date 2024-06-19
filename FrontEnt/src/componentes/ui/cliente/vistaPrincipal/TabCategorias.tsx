import { Box, Typography, Tabs, Tab, CircularProgress } from "@mui/material";
import React from "react";
import { getCategoriasIdSucursal, localData } from "../../../../servicios/vistaInicio/FuncionesAPI";
import Categoria from "../../../../entidades/Categoria";
import GrillaProductos from "./GrillaProductos";

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
        <Box sx={{ p: 3 }}>
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

export default function TabsCategorias() {
  const [value, setValue] = React.useState(0);
  const idSucursal = localData.getSucursal("sucursal").id;
  const { data, isLoading, error } = getCategoriasIdSucursal(idSucursal);

  if (error)
    return (
      <>
        <h1>Ups! Ocurrio un error al obtener los menús. Reintente nuevamente en unos minutos</h1>
      </>
    );
  if (isLoading)
    return (
      <>
        <CircularProgress color="inherit" />
      </>
    );

  const categoriasFiltradas = data
  ?.filter(categoria => categoria.denominacion !== 'Insumos')
  ?.filter(categoria => categoria.articulos && categoria.articulos.length > 0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          {categoriasFiltradas?.map((item: Categoria) => (
            <Tab key={item.id} label={item.denominacion} {...a11yProps(item.id)}/>
          ))}

        </Tabs>
      </Box>
      {categoriasFiltradas?.map((item: Categoria, index: number) => (
        <CustomTabPanel key={item.id} value={value} index={index}>
          <GrillaProductos
            key={item.id}
            categoria={item}
          />
        </CustomTabPanel>
      ))}
    </Box>
  );
}
