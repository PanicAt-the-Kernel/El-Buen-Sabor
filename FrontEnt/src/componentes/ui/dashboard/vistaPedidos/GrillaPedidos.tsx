import { CircularProgress, Container, Grid } from "@mui/material";
import Pedido from "../../../../entidades/Pedido";
import ItemGrillaPedido from "./ItemGrillaPedido";
import { getPedidosPorSucursal } from "../../../../servicios/PedidoService";
import { localSession } from "../../../../servicios/localSession";

export default function GrillaPedidos() {
  const { data, isLoading, error, mutate } = getPedidosPorSucursal(
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
    const pedidos = data?.filter((item) => {
      if (item.estado == "APROBADO") {
        return item;
      }
    });
    return (
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {pedidos && pedidos.length === 0 ? (
          <Grid item xs={12}>
            <p>Este local no tiene pedidos</p>
          </Grid>
        ) : (
          pedidos?.map((item: Pedido, index: number) => {
            return (
              <Grid item key={item.id}>
                <ItemGrillaPedido
                  key={index}
                  pedidoObj={item}
                  mutador={mutate}
                />
              </Grid>
            );
          })
        )}
      </Grid>
    );
  }
  if (userRoles.includes("DELIVERY")) {
    const pedidos = data?.filter((item) => {
      if (item.estado == "APROBADO") {
        return item;
      }
    });
    return (
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {pedidos && pedidos.length === 0 ? (
          <Grid item xs={12}>
            <p>No hay pedidos que entregar</p>
          </Grid>
        ) : (
          pedidos?.map((item: Pedido, index: number) => {
            return (
              <Grid item key={item.id}>
                <ItemGrillaPedido
                  key={index}
                  pedidoObj={item}
                  mutador={mutate}
                />
              </Grid>
            );
          })
        )}
      </Grid>
    );
  }
  if (userRoles.includes("CAJERO")) {
    const pedidos = data?.filter((item) => {
      if (
        item.estado === "PENDIENTE" ||
        item.estado === "TERMINADO" ||
        item.estado === "DELIVERY" ||
        item.estado === "PAGO_REALIZADO"
      ) {
        return item;
      }
    });
    return (
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {pedidos && pedidos.length === 0 ? (
          <Grid item xs={12}>
            <p>No hay pedidos para revisar</p>
          </Grid>
        ) : (
          data?.map((item: Pedido, index: number) => {
            return (
              <Grid item key={item.id}>
                <ItemGrillaPedido
                  key={index}
                  pedidoObj={item}
                  mutador={mutate}
                />
              </Grid>
            );
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
            <ItemGrillaPedido key={index} pedidoObj={item} mutador={mutate} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
