import { Box, Typography, Tabs, Tab } from "@mui/material";
import React from "react";
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
          <Tab label="Promociones" {...a11yProps(0)} />
          <Tab label="Hamburguesas" {...a11yProps(1)} />
          <Tab label="Pizzas" {...a11yProps(2)} />
          <Tab label="Lomos" {...a11yProps(3)} />
          <Tab label="Bebidas" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <GrillaProductos />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GrillaProductos />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <GrillaProductos />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <GrillaProductos />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <GrillaProductos />
      </CustomTabPanel>
    </Box>
  );
}
