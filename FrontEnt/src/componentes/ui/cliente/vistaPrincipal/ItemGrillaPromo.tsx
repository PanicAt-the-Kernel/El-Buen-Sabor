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
import Promocion from "../../../../entidades/Promocion";
import { useAuth0 } from "@auth0/auth0-react";
import getHora from "../../../../hooks/getHora";
import Pedido from "../../../../entidades/Pedido";
import { verificarStockPromo } from "../../../../servicios/PedidoService";

interface ItemGrillaProductoTypes {
  item: Promocion;
}

export default function ItemGrilla({ item }: ItemGrillaProductoTypes) {
  const { carrito, addPromoCarrito, removePromoCarrito } =
    useContext(CarritoContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const estaEnHorario = getHora();
  const { isAuthenticated } = useAuth0();
  const [sinStock,SetSinStock]=useState<boolean>(false);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const estaEnCarrito = carrito.find(
    (itemCarrito) => itemCarrito.promocion === item.id
  );

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
    pedido.sucursal=null;
    pedido.detallePedidos=carrito;
    if(await verificarStockPromo(item.id, pedido)){
      addPromoCarrito(item);
    }else{
      alert("Esta promo esta sin stock"); 
      SetSinStock(true);
    }
    
  };

  return (
    <Card sx={{ maxWidth: 330, textAlign: "center" }}>
      <CardMedia sx={{ height: 150, margin: 1 }} image={item.imagenes[0].url} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.denominacion}
        </Typography>
        <Typography variant="h6" color="text">
          {"$" + item.precioPromocional}
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
            onClick={handleOpenPopover}
          >
            ¿Qué trae?
          </Button>
          <Popover
            open={open}
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
            <List>
              {item.promocionDetalles.map((detalle, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={
                      detalle.cantidad + " " + detalle.articulo.denominacion
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Popover>
          {isAuthenticated && estaEnHorario && (
            <Stack direction={"row"}>
              <Button
                size="small"
                startIcon={<Remove />}
                onClick={() => {
                  removePromoCarrito(item);
                }}
              />
              <Badge
                badgeContent={estaEnCarrito ? estaEnCarrito.cantidad : 0}
                color="info"
              >
                <ShoppingCart />
              </Badge>
              <Button
                size="small"
                startIcon={<Add />}
                onClick={() => handleClick()}
                disabled={sinStock}
              />
            </Stack>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}
