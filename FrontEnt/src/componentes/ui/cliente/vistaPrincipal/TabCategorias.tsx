import { Box, Typography, Tabs, Tab, CircularProgress } from "@mui/material";
import React from "react";
import GrillaProductos from "./GrillaProductos";
import GrillaPromo from "./GrillaPromo";
import ArticuloManufacturado from "../../../../entidades/ArticuloManufacturado";
import ArticuloInsumo from "../../../../entidades/ArticuloInsumo";
import { getArticuloInsumoNoElabIdSucursal } from "../../../../servicios/ArticuloInsumoService";
import { getArticulosManufacturadosIdSucursal } from "../../../../servicios/ArticuloManufacturadoService";
import { getPromocionesIdSucursal } from "../../../../servicios/PromocionService";
import { localSession } from "../../../../servicios/localSession";
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
  const idSucursal = localSession.getSucursal("sucursal").id;
  const {
    data: articulos,
    isLoading,
    error,
  } = getArticulosManufacturadosIdSucursal(idSucursal);
  const { data: insumosNoElab } = getArticuloInsumoNoElabIdSucursal(idSucursal);
  const { data: promociones } = getPromocionesIdSucursal(idSucursal);

  if (error)
    return (
      <>
        <h1>
          Ups! Ocurrio un error al obtener los menús. Reintente nuevamente en
          unos minutos
        </h1>
      </>
    );
  if (isLoading)
    return (
      <>
        <CircularProgress color="inherit" />
      </>
    );

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const promocionesFiltradas = promociones?.filter((promocion) => {
    const fechaHoy = new Date();
    const fechaPromo = new Date(promocion.fechaHasta);
    if (fechaPromo > fechaHoy) {
      return promocion;
    }
  });
  const articulosPorCategoria = new Map<
    number,
    ArticuloManufacturado[] | ArticuloInsumo[]
  >();

  articulos?.forEach((articulo) => {
    const categoriaId = articulo.categoria.id;

    if (articulosPorCategoria.has(categoriaId)) {
      //@ts-ignore
      articulosPorCategoria.get(categoriaId)?.push(articulo);
    } else {
      articulosPorCategoria.set(categoriaId, [articulo]);
    }
  });

  insumosNoElab?.forEach((articulo) => {
    const categoriaId = articulo.categoria.id;

    if (articulosPorCategoria.has(categoriaId)) {
      //@ts-ignore
      articulosPorCategoria.get(categoriaId)?.push(articulo);
    } else {
      articulosPorCategoria.set(categoriaId, [articulo]);
    }
  });

  if (articulos && insumosNoElab && promociones)
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
            <Tab key={1} label="Promociones" {...a11yProps(1)} />
            {Array.from(articulosPorCategoria).map(
              ([categoriaId, articulos], index) => (
                <Tab
                  key={categoriaId}
                  label={`${articulos[0].categoria.denominacion}`}
                  {...a11yProps(index + 1)}
                />
              )
            )}
          </Tabs>
        </Box>
        <CustomTabPanel key={1} value={value} index={0}>
          {promocionesFiltradas!=undefined && (
            <GrillaPromo key={1} promociones={promocionesFiltradas} />
          )}
        </CustomTabPanel>
        {Array.from(articulosPorCategoria).map(
          ([categoriaId, articulos], index) => (
            <CustomTabPanel key={categoriaId} value={value} index={index + 1}>
              <GrillaProductos key={categoriaId} articulos={articulos} />
            </CustomTabPanel>
          )
        )}
      </Box>
    );
}
