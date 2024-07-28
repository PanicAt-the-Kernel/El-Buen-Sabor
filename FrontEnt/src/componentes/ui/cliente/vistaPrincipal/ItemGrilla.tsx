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
import getHora from "../../../../hooks/getHora";
import { verificarStockArticulo } from "../../../../servicios/PedidoService";
import Pedido from "../../../../entidades/Pedido";
import Sucursal from "../../../../entidades/Sucursal.ts";
import {localSession} from "../../../../servicios/localSession.ts";

interface ItemGrillaProductoTypes {
  item: ArticuloInsumo | ArticuloManufacturado;
}

export default function ItemGrilla({ item }: ItemGrillaProductoTypes) {
  const { carrito, addArticuloCarrito, removeArticuloCarrito } = useContext(CarritoContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const estaEnHorario=getHora();
  const { isAuthenticated } = useAuth0();
  const [sinStock,SetSinStock]=useState<boolean>(false);

  const sucursal: Sucursal = localSession.getSucursal("sucursal");
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  let mostrarIngredientes = true;

  if ((item as ArticuloInsumo).esParaElaborar != null) mostrarIngredientes = false;

  const handleClick =async () => {
    let pedido = new Pedido();
    pedido.formaPago=null;
    pedido.estado=null;
    pedido.tipoEnvio=null;
    pedido.totalCosto=null;
    pedido.total=null;
    pedido.cliente=null;
    pedido.domicilio=null;
    pedido.empleado=null;
    pedido.factura=null;
    pedido.sucursal=sucursal;
    pedido.detallePedidos=carrito;
    if(await verificarStockArticulo(item.id, pedido)){
      addArticuloCarrito(item);
    }else{
      alert("Este articulo esta sin stock"); 
      SetSinStock(true);
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
                onClick={() => { handleClick() }}
              />
            </Stack>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}
