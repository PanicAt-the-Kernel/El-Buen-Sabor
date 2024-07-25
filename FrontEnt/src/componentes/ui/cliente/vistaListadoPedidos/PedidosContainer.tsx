import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import AcordeonPedido from "./AcordeonPedido";
import { getPedidosCliente } from "../../../../servicios/PedidoService";
import Pedido from "../../../../entidades/Pedido";
import { localSession } from "../../../../servicios/localSession";

export default function PedidosContainer() {
  const { data: pedidos,isLoading,error,mutate } = getPedidosCliente(localSession.getCliente("Cliente").userName);
  if(isLoading){
    return(<CircularProgress />)
  }
  if(error){
    return(<Typography>Ocurrio un error al cargar los datos</Typography>)
  }
  return (
    <Paper
      elevation={5}
      sx={{
        maxHeight: 600,
        overflow: "hidden",
        overflowY: "scroll",
        padding: 3,
      }}
    >
      <Stack spacing={2}>
        {pedidos
          ?.sort((a, b) => b.id - a.id)
          .map((item: Pedido, index: number) => (
            <AcordeonPedido key={index} pedido={item} mutador={mutate}/>
          ))}
      </Stack>
    </Paper>
  );
}
