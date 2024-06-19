import { Add, Info, Remove, ShoppingCart } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  Badge,
} from "@mui/material";
import Articulo from "../../../../entidades/Articulo";
import { useContext } from "react";
import { CarritoContext } from "../../../../context/CarritoContext";

interface ItemGrillaProductoTypes {
  item: Articulo;
}

export default function ItemGrilla({ item }: ItemGrillaProductoTypes) {
  const { carrito, addCarrito, removeItemCarrito } = useContext(CarritoContext);

  const estaEnCarrito = carrito.find((itemCarrito) => itemCarrito.articulo === item.id);

  return (
    <Card sx={{ maxWidth: 330, textAlign: "center" }}>
      <CardMedia
        sx={{ height: 150, margin: 1 }}
        image={item.imagenes[0].url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.denominacion}
        </Typography>
        <Typography variant="h6" color="text">
          {"$" + item.precioVenta}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Stack spacing={2} alignItems={"center"}>
          <Button
            size="small"
            //disabled={(usuario == null)}
            variant="contained"
            color="info"
            startIcon={<Info />}
            onClick={() => { /* Mostrar info */ }}
          >
            Ingredientes
          </Button>
          <Stack direction={"row"}>
            <Button
              size="small"
              startIcon={<Remove />}
              onClick={() => { removeItemCarrito(item) }}
            />
            <Badge badgeContent={estaEnCarrito ? estaEnCarrito.cantidad : 0} color="info">
              <ShoppingCart />
            </Badge>
            <Button size="small"
              startIcon={<Add />}
              onClick={() => { addCarrito(item) }}
            />
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
}
