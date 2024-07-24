import {  CircularProgress, Container, Grid } from "@mui/material";
import Pedido from "../../../../entidades/Pedido";
import ItemGrillaPedido from "./ItemGrillaPedido";
import { getPedidosPorSucursal } from "../../../../servicios/PedidoService";
import { localSession } from "../../../../servicios/localSession";

export default function GrillaPedidos() {
  const { data, isLoading, error,mutate } = getPedidosPorSucursal(
    localSession.getSucursal("sucursal").id
  );
  const userRoles: string[] = localSession.getRol("userRoles") || [""];

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
  if (userRoles.includes("COCINERO")) {
    return (
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {data && data.length === 0 ? (
          <Grid item xs={12}>
            <p>Este local no tiene pedidos</p>
          </Grid>
        ) : (
          data?.map((item: Pedido, index: number) => {
            if (item.estado == "APROBADO") {
              return (
                <Grid item key={item.id}>
                  <ItemGrillaPedido key={index} pedidoObj={item} mutador={mutate}/>
                </Grid>
              );
            } else {
              return null;
            }
          })
        )}
      </Grid>
    );
  }
  if (userRoles.includes("CAJERO")) {
    return (
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {data && data.length === 0 ? (
          <Grid item xs={12}>
            <p>Este local no tiene pedidos</p>
          </Grid>
        ) : (
          data?.map((item: Pedido, index: number) => {
            if (item.estado === "DELIVERY") {
              return (
                <Grid item key={item.id}>
                  <ItemGrillaPedido key={index} pedidoObj={item} mutador={mutate}/>
                </Grid>
              );
            } else {
              return null;
            }
          })
        )}
      </Grid>
    );
  }
  if (userRoles.includes("DELIVERY")) {
    return (
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {data && data.length === 0 ? (
          <Grid item xs={12}>
            <p>Este local no tiene pedidos</p>
          </Grid>
        ) : (
          data?.map((item: Pedido, index: number) => {
            if (
              item.estado === "PENDIENTE" ||
              item.estado === "TERMINADO" ||
              item.estado === "DELIVERY"
            ) {
              return (
                <Grid item key={item.id}>
                  <ItemGrillaPedido key={index} pedidoObj={item} mutador={mutate}/>
                </Grid>
              );
            } else {
              return null;
            }
          })
        )}
      </Grid>
    );
  }
  return (
    <Grid container spacing={3} sx={{ marginTop: 3 }}>
      {data && data.length === 0 ? (
        <Grid item xs={12}>
          <p>No hay pedidos que administrar</p>
        </Grid>
      ) : (
        data?.map((item: Pedido, index: number) => (
          <Grid item key={item.id}>
            <ItemGrillaPedido key={index} pedidoObj={item} mutador={mutate}/>
          </Grid>
        ))
      )}
      
    </Grid>
  );
  
}
