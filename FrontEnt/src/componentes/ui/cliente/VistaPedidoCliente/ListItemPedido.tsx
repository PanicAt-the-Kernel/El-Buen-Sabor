import { Add, Delete, Remove, ShoppingCart } from "@mui/icons-material";
import { Badge, Box, Button, ListItem, Stack, Typography } from "@mui/material";

export default function ListItemPedido() {
  return (
    <ListItem>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={2}
        alignItems="center"
      >
        <Box
          component="img"
          src="https://placehold.co/600x400/png"
          sx={{ width: 200 }}
        />
        <Stack direction="column" spacing={1} alignItems={"center"}>
          <Typography>Nombre Producto</Typography>
          <Typography variant="body2" color="text.secondary">
            Precio Unitario $123456
          </Typography>
        </Stack>
        <Stack direction="column" spacing={1} alignItems={"center"}>
          <Typography>Cantidad: 12 unidad/unidades</Typography>
          <Typography variant="body2" color="text.secondary">
            SubTotal $123456789
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button variant="text" color="error">
            <Remove />
          </Button>
          <Badge badgeContent={12} color="info">
            <ShoppingCart />
          </Badge>
          <Button variant="text" color="info">
            <Add />
          </Button>
        </Stack>
        <Button variant="outlined" color="error" startIcon={<Delete />}>
          Quitar del carrito
        </Button>
      </Stack>
    </ListItem>
  );
}
