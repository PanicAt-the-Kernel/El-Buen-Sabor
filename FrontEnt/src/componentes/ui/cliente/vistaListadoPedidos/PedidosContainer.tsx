import { CircularProgress, Paper, Stack } from "@mui/material";
import AcordeonPedido from "./AcordeonPedido";
import { useState } from "react";
import { getPedidosCliente, localData } from "../../../../servicios/vistaInicio/FuncionesAPI";
import Pedido from "../../../../entidades/Pedido";

export default function PedidosContainer() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const cliente  = localData.getCliente("Cliente");
  const {data, isLoading, error} = getPedidosCliente(cliente.userName);


  if(error) {
    return(
      <span>Ocurrio el error</span>   
    )
  }

  if(isLoading) {
    return(
      <CircularProgress />
    )
  }

  return (
    <Paper
      elevation={5}
      sx={{
        maxHeight: 600,
        overflow: "hidden",
        overflowY: "scroll",
        padding:3
      }}
    >
      <Stack spacing={2}>
        {data?.map((pedido: Pedido) => (
          <AcordeonPedido open={openModal} setOpen={setOpenModal} pedidoObjeto={pedido} />
        ) )}
      </Stack>
    </Paper>
  );
}
