import { Paper, Grid, Box, Typography, useTheme } from "@mui/material";
import ItemAlerta from "./ItemAlerta";
import { getAllInsumos } from "../../../../servicios/ArticuloInsumoService";
import ArticuloInsumo from "../../../../entidades/ArticuloInsumo";
import { controlNivelStockInsumo } from "../../../../servicios/FuncionesControl";
import getTokenAuth0 from "../../../../hooks/getTokenAuth0";

function AlertaHolder() {
  const basil = useTheme();
  const token=getTokenAuth0();
  const { data,isLoading,error } = getAllInsumos(token);
  if(error){
    return(<h1>Ocurrio un error al obtener los datos</h1>)
  }
  if(isLoading){
    return(<h1>Obteniendo datos...</h1>)
  }
  return (
    <Box component="div" sx={{width:430}}>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Listado de Insumos con Bajo Stock
      </Typography>
      <Grid container spacing={1} >
        {data?.map((item: ArticuloInsumo) => {
          switch (controlNivelStockInsumo(item)) {
            case 1:
              return (
                <Grid item xs={12} sm={12} md={6}>
                  <Paper elevation={3}>
                    <ItemAlerta
                      nombre={item.denominacion}
                      cantidad={item.stockActual}
                      unidadMedida={item.unidadMedida.denominacion}
                      estiloColor="#ffc4b3"
                      nivelAlerta="Reservas a Nivel Medio"
                    />
                  </Paper>
                </Grid>
              );
            case 2:
              return (
                <Grid item>
                  <Paper elevation={5}>
                    <ItemAlerta
                      nombre={item.denominacion}
                      cantidad={item.stockActual}
                      unidadMedida={item.unidadMedida.denominacion}
                      estiloColor="#fa8664"
                      nivelAlerta="Reservas a Nivel Bajo"
                    />
                  </Paper>
                </Grid>
              );
            case 3:
              return (
                <Grid item>
                  <Paper elevation={10}>
                    <ItemAlerta
                      nombre={item.denominacion}
                      cantidad={item.stockActual}
                      unidadMedida={item.unidadMedida.denominacion}
                      estiloColor={basil.palette.secondary.main}
                      nivelAlerta="Reservas a Nivel Muy Bajo"
                    />
                  </Paper>
                </Grid>
              );
          }
        })}
      </Grid>
    </Box>
  );
}
export default AlertaHolder;
