import { CircularProgress, Container, Grid } from "@mui/material";
import Pedido from "../../../../entidades/Pedido";
import ItemGrillaPedido from "./ItemGrillaPedido";
import { getAllPedidos } from "../../../../servicios/vistaInicio/FuncionesAPI";
import { useEffect, useState } from "react";

export default function GrillaPedidos() {
  const { data, isLoading, error } = getAllPedidos();
  const userRoles: string[] = JSON.parse(localStorage.getItem("userRoles") || "[]");
  const [pedidos, setPedidos] = useState<Pedido[] | null>(null);

  useEffect(() => {
    if (data && !pedidos) {
      setTimeout(() => {
        setPedidos(data);
      }, 500); 
    }
  }, [data, pedidos]);

  useEffect(() => {
    if(!isLoading) {
      if (userRoles.includes("COCINERO") && pedidos) {
        setPedidos(prevPedidos => prevPedidos?.filter(pedido => pedido.estado === 'PREPARACION') || []);
      }
      if (userRoles.includes("CAJERO") && pedidos) {
        setPedidos(prevPedidos => prevPedidos?.filter(pedido => pedido.estado === 'PENDIENTE' || pedido.estado === 'ENTREGADO') || []);
      }
      if (userRoles.includes("DELIVERY") && pedidos) {
        setPedidos(prevPedidos => prevPedidos?.filter(pedido => pedido.estado === 'PENDIENTE') || []);
      }
    }
  }, [pedidos, userRoles]);

  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <h1>Ocurrio un error al cargar los datos</h1>
      </Container>
    );
  }

  return (
    <Grid container spacing={3} sx={{ marginTop: 3 }}>
      {!pedidos || pedidos.length === 0 ? (
        <Grid item xs={12}>
          <p>No hay pedidos que administrar</p>
        </Grid>
      ) : (
        pedidos.map((item) => (
          <Grid item key={item.id}>
            <ItemGrillaPedido pedidoObj={item} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
