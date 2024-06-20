import { Paper, Stack } from "@mui/material";
import AcordeonPedido from "./AcordeonPedido";
import ModalListadoProductos from "./ModalListadoProductos";
import { useState } from "react";

export default function PedidosContainer() {
  const [openModal, setOpenModal] = useState<boolean>(false);
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
        <AcordeonPedido open={openModal} setOpen={setOpenModal} />
        <AcordeonPedido open={openModal} setOpen={setOpenModal} />
        <AcordeonPedido open={openModal} setOpen={setOpenModal} />
        <AcordeonPedido open={openModal} setOpen={setOpenModal} />
        <AcordeonPedido open={openModal} setOpen={setOpenModal} />
        <AcordeonPedido open={openModal} setOpen={setOpenModal} />
        <AcordeonPedido open={openModal} setOpen={setOpenModal} />
        <AcordeonPedido open={openModal} setOpen={setOpenModal} />
        <AcordeonPedido open={openModal} setOpen={setOpenModal} />
        <AcordeonPedido open={openModal} setOpen={setOpenModal} />
      </Stack>
      <ModalListadoProductos open={openModal} setOpen={setOpenModal} />
    </Paper>
  );
}
