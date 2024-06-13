import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box
} from "@mui/material";
import { useContext } from "react";
import { CarritoContext } from "../../../../context/CarritoContext";
import { Add, AddShoppingCart, Info, Remove } from "@mui/icons-material";
import Articulo from "../../../../entidades/Articulo";

interface ItemGrillaProductoTypes {
  item: Articulo;
}

export default function ItemGrillaProducto({ item }: ItemGrillaProductoTypes) {
  const { carrito, addCarrito, removeItemCarrito } = useContext(CarritoContext);

  const estaEnCarrito = carrito.find((itemCarrito) => itemCarrito.articulo === item.id);

  return (
    <Grid item sx={{ marginBottom: 2 }}>
      <Card sx={{ width: 270, textAlign: "center" }}>
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
          <Typography variant="body2" color="text.secondary">
            Costo de envío: $20
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
        <Button
            size="medium"
            //disabled={(usuario == null)}
            variant="contained"
            color="info"
            startIcon={<Info />}
            onClick={() => { /* Mostrar info */ }}
          >
            Info
          </Button>
          {estaEnCarrito ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                size="small"
                variant="contained"
                color="success"
                startIcon={<Remove />}
                onClick={() => { removeItemCarrito(item) }}
                sx={{ minWidth: 30 }} 
              />
              <Box sx={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: 1,
                margin: '0 8px',
                border: '1px solid #ccc'
              }}>
                <Typography variant="body1">{estaEnCarrito.cantidad}</Typography>
              </Box>
              <Button
                size="small"
                variant="contained"
                color="success"
                startIcon={<Add />}
                onClick={() => { addCarrito(item) }}
                sx={{ minWidth: 30 }}
              />
            </Box>
          ) : (
            <Button
              size="medium"
              //disabled={usuario == null}
              variant="contained"
              color="success"
              startIcon={<AddShoppingCart />}
              onClick={() => { addCarrito(item) }}
            >
              Comprar
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
