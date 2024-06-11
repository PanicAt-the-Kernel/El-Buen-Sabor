import { Box, Stack } from "@mui/material";
import AcordeonPedido from "./AcordeonPedido";

export default function PedidosContainer() {
  return (
    <Box component="div">
      <Stack spacing={2}>
        <AcordeonPedido />
        <AcordeonPedido />
      </Stack>
    </Box>
  );
}
