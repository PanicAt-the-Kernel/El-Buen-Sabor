import { createContext, useState, ReactNode, useEffect } from "react";
import DetallePedido from "../entidades/DetallePedido";
import Articulo from "../entidades/Articulo";

interface CarritoTypes {
  carrito: DetallePedido[];
  addCarrito: (item: Articulo) => void;
  removeItemCarrito: (item: Articulo) => void;
  vaciarCarrito: () => void;
  totalPedido: number;
  setTotalPedido: React.Dispatch<React.SetStateAction<number>>;
  totalEnvio: number;
  setTotalEnvio: React.Dispatch<React.SetStateAction<number>>;
}

export const CarritoContext = createContext<CarritoTypes>({
  carrito: [],
  addCarrito: () => { },
  removeItemCarrito: () => { },
  vaciarCarrito: () => { },
  totalPedido: 0,
  setTotalPedido: () => { },
  totalEnvio: 0,
  setTotalEnvio: () => { },
});

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<DetallePedido[]>([]);
  const [totalPedido, setTotalPedido] = useState<number>(0);
  const [totalEnvio, setTotalEnvio] = useState<number>(0);

  useEffect(() => {
    const calcularTotal = () => {
      let total: number = 0;
      carrito.forEach((item: DetallePedido) => {
        total += item.subTotal;
      });
      setTotalPedido(total);
      setTotalEnvio(20);
    };

    calcularTotal();
  }, [carrito]);

  const addCarrito = (item: Articulo) => {
    const estaEnCarrito = carrito.find(
      (itemCarrito) => itemCarrito.articulo === item.id
    );

    if (estaEnCarrito) {
      setCarrito(
        carrito.map((itemCarrito) =>
          itemCarrito.articulo === item.id
            ? { ...itemCarrito, cantidad: itemCarrito.cantidad + 1, subTotal: (itemCarrito.cantidad + 1) * item.precioVenta }
            : itemCarrito
        )
      );
    } else {
      const newItem = new DetallePedido;
      newItem.id = 0;
      newItem.articulo = item.id;
      newItem.cantidad = 1;
      newItem.subTotal = item.precioVenta;
      newItem.promocion = null;
      newItem.articuloAux = item;
      setCarrito([...carrito, newItem]);
    }
  };

  const removeItemCarrito = (item: Articulo) => {
    const estaEnCarrito = carrito.find(
      (itemCarrito) => itemCarrito.articulo === item.id
    );

    if (estaEnCarrito) {
      if (estaEnCarrito.cantidad === 1) {
        setCarrito(carrito.filter((itemCarrito) => itemCarrito.articulo !== item.id));
      } else {
        setCarrito(
          carrito.map((itemCarrito) =>
            itemCarrito.articulo === item.id
              ? { ...itemCarrito, cantidad: itemCarrito.cantidad - 1, subTotal: (itemCarrito.cantidad - 1) * item.precioVenta }
              : itemCarrito
          )
        );
      }
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        addCarrito,
        removeItemCarrito,
        vaciarCarrito,
        totalPedido,
        setTotalPedido,
        totalEnvio,
        setTotalEnvio
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
