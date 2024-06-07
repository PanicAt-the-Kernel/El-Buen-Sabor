import { CircularProgress, Container, Grid } from "@mui/material";
import Pedido from "../../../../entidades/Pedido";
import ItemGrillaPedido from "./ItemGrillaPedido";
import { getAllPedidos } from "../../../../servicios/vistaInicio/FuncionesAPI";

export default function GrillaPedidos() {
  const { data, isLoading, error } = getAllPedidos();
  if (isLoading) {
    <Container>
      <CircularProgress />
    </Container>;
  }
  if (error) {
    <Container>
      <h1>Ocurrio un error al cargar los datos</h1>
    </Container>;
  }
  return (
    <Grid container spacing={3} sx={{marginTop:3}}>
      {data?.map((item: Pedido) => (
        <Grid item md={4} >
          <ItemGrillaPedido
            pedidoObj={item}
          />
        </Grid>
      ))}
    </Grid>
  );
}
