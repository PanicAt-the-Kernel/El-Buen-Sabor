import { createContext, useState, ReactNode, useEffect } from "react";
import DetallePedido from "../entidades/DetallePedido";
import Articulo from "../entidades/Articulo";

interface CarritoTypes {
  carrito: DetallePedido[];
  addCarrito: (item: Articulo) => void;
  removeItemCarrito: (item: Articulo) => void;
  vaciarCarrito: () => void;
  totalPedido: number;
  setTotalPedido: React.Dispatch<React.SetStateAction<number>>
}
export const CarritoContext = createContext<CarritoTypes>({
  carrito: [],
  addCarrito: () => { },
  removeItemCarrito: () => { },
  vaciarCarrito: () => { },
  totalPedido: 0,
  setTotalPedido: () => { }
});

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<DetallePedido[]>([]);
  const [totalPedido, setTotalPedido] = useState<number>(0);

  useEffect(() => {
    const calcularTotal = () => {
      let total: number = 0;
      carrito.forEach((item: DetallePedido) => {
        total += item.cantidad * item.articulo.precioVenta;
      });
      setTotalPedido(total);
    };

    calcularTotal();
  }, [carrito]);

  const addCarrito = (item: Articulo) => {
    const estaEnCarrito = carrito.find(
      (itemCarrito) => itemCarrito.articulo.id === item.id
    );

    if (estaEnCarrito) {
      setCarrito(
        carrito.map((itemCarrito) =>
          itemCarrito.articulo.id === item.id
            ? { ...itemCarrito, cantidad: itemCarrito.cantidad + 1, subTotal: itemCarrito.cantidad*item.precioVenta }
            : itemCarrito
        )
      );
    } else {
      const newItem = new DetallePedido;
      newItem.id = 0;
      newItem.articulo = item;
      newItem.cantidad = 1;
      newItem.subTotal = item.precioVenta
      setCarrito([...carrito,  newItem ]);
    }
  };

  const removeItemCarrito = (item: Articulo) => {
    const estaEnCarrito = carrito.find(
      (itemCarrito) => itemCarrito.articulo.id === item.id
    );

    if (estaEnCarrito) {
      if (estaEnCarrito.cantidad === 1) {
        setCarrito(carrito.filter((itemCarrito) => itemCarrito.articulo.id !== item.id));
      } else {
        setCarrito(
          carrito.map((itemCarrito) =>
            itemCarrito.id === item.id
              ? { ...itemCarrito, cantidad: itemCarrito.cantidad - 1, subTotal: itemCarrito.cantidad*item.precioVenta }
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
        setTotalPedido
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
