import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Button, ListItemAvatar, Stack, Typography } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Add, Remove, RemoveShoppingCart } from "@mui/icons-material";
import { useContext, useState } from "react";
import { CarritoContext } from "../../../../context/CarritoContext";
import { savePedido } from "../../../../servicios/vistaInicio/FuncionesAPI";
import Pedido from "../../../../entidades/Pedido";

interface DrawerTypes {
  estado: boolean;
  setEstado: (item: boolean) => void;
}

export default function SidebarCarrito({ estado, setEstado }: DrawerTypes) {
  //const sucursal: Sucursal = await getSucursalIdF(1);
  const { carrito, vaciarCarrito, totalPedido, setTotalPedido, removeItemCarrito, addCarrito } = useContext(CarritoContext);
  const [pedido, setPedido] = useState<Pedido>(new Pedido);

  const handleSubmit = () => {
    var fecha = new Date().toJSON().slice(0, 10);//Dia actual

    const updatedPedido = {
      ...pedido,
      horaEstimadaFinalizacion: "22:00:00.000",
      total: totalPedido,
      totalCosto: 0,
      estado: "PREPARACION",
      tipoEnvio: "DELIVERY",
      formaPago: "EFECTIVO",
      fechaPedido: fecha,
      detallePedidos: carrito,
    };

    setPedido(updatedPedido);
    savePedido(updatedPedido, setTotalPedido, vaciarCarrito);
  };

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation">
      <Typography variant="h4" textAlign={"center"} marginTop={2}>
        Mi Carrito
      </Typography>
      <Divider />
      {carrito.length == 0 && <span>El carrito esta vacío.</span>}
      <List>
        {carrito.map((item) => (
          <ListItem key={item.id}>
            <ListItemAvatar>
              <Avatar src={item.articulo.imagenes[0].url} />
            </ListItemAvatar>
            <ListItemText
              primary={item.articulo.denominacion}
              secondary={
                <>
                  <div>{item.cantidad} {item.cantidad === 1 ? 'unidad' : 'unidades'}</div>
                  <div>Precio por unidad: ${item.articulo.precioVenta.toFixed(2)}</div>
                  <div>Subtotal: ${(item.articulo.precioVenta * item.cantidad).toFixed(2)}</div>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      startIcon={<Remove />}
                      onClick={() => { removeItemCarrito(item.articulo) }}
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
                      <Typography variant="body1">{item.cantidad}</Typography>
                    </Box>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      startIcon={<Add />}
                      onClick={() => { addCarrito(item.articulo) }}
                      sx={{ minWidth: 30 }}
                    />
                  </Box>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography variant="h5" textAlign={"center"} marginBottom={2}>
        Pedido: ${totalPedido}
      </Typography>
      <Typography variant="h5" textAlign={"center"} marginBottom={2}>
        Costo de envío: $500
      </Typography>
      <Typography variant="h5" textAlign={"center"} marginBottom={2}>
        Total: ${totalPedido + 500}
      </Typography>
      <Divider />
      <Stack direction="row" spacing={3} justifyContent={"center"}>
        {carrito.length == 0 ? (
          <Button
            variant="contained"
            startIcon={<ShoppingCartCheckoutIcon />}
            disabled
          >
            Pedir
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<ShoppingCartCheckoutIcon />}
            onClick={handleSubmit}
          >
            Pedir
          </Button>
        )}
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            vaciarCarrito();
          }}
          startIcon={<RemoveShoppingCart />}
        >
          Vaciar
        </Button>
      </Stack>
    </Box>
  );

  return (
    <div>
      <Drawer
        open={estado}
        onClose={() => {
          setEstado(!estado);
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
