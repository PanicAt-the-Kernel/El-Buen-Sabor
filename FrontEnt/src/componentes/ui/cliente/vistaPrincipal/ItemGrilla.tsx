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
  Popover,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useContext, useState } from "react";
import { CarritoContext } from "../../../../context/CarritoContext";
import ArticuloInsumo from "../../../../entidades/ArticuloInsumo";
import ArticuloManufacturado from "../../../../entidades/ArticuloManufacturado";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import getHora from "../../../../hooks/getHora";

interface ItemGrillaProductoTypes {
  item: ArticuloInsumo | ArticuloManufacturado;
}

export default function ItemGrilla({ item }: ItemGrillaProductoTypes) {
  const { carrito, addArticuloCarrito, removeArticuloCarrito } = useContext(CarritoContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const estaEnHorario=getHora();
  const { isAuthenticated } = useAuth0();

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  let mostrarIngredientes = true;

  if ((item as ArticuloInsumo).esParaElaborar != null) mostrarIngredientes = false;

  const verificarStock = () => {
    if ((item as ArticuloInsumo).esParaElaborar != null) {
      return (item as ArticuloInsumo).stockActual > (estaEnCarrito ? estaEnCarrito.cantidad : 0);
    } else {
      return (item as ArticuloManufacturado).articuloManufacturadoDetalles.every(detalle => detalle.articuloInsumo.stockActual >= (estaEnCarrito ? (estaEnCarrito.cantidad+1) * detalle.cantidad : 0));
    }
  };

  const handleAddClick = () => {
    if (verificarStock()) {
      addArticuloCarrito(item);
    } else {
      alert("No hay stock suficiente");
    }
  };

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
          {mostrarIngredientes && ( // Condición para mostrar el botón y el Popover solo si es manufacturado
            <Button
              size="small"
              variant="contained"
              color="info"
              startIcon={<Info />}
              onClick={handleOpenPopover}
            >
              Ingredientes
            </Button>
          )}
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {mostrarIngredientes && ( // Condición para mostrar el contenido del Popover solo si es manufacturado
              <List>
                {(item as ArticuloManufacturado).articuloManufacturadoDetalles.map((detalle, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${detalle.articuloInsumo.denominacion}`} />
                  </ListItem>
                ))}
              </List>
            )}
          </Popover>
          {(isAuthenticated && estaEnHorario) && (
            <Stack direction={"row"}>
              <Button
                size="small"
                startIcon={<Remove />}
                onClick={() => { removeArticuloCarrito(item) }}
              />
              <Badge badgeContent={estaEnCarrito ? estaEnCarrito.cantidad : 0} color="info">
                <ShoppingCart />
              </Badge>
              <Button size="small"
                startIcon={<Add />}
                onClick={() => { handleAddClick() }}
              />
            </Stack>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}
