import { createContext, useState, ReactNode, useEffect } from "react";
import Articulo from "../entidades/Articulo";

interface CarritoTypes {
  carrito: Articulo[];
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
  const [carrito, setCarrito] = useState<Articulo[]>([]);
  const [totalPedido, setTotalPedido] = useState<number>(0);

  useEffect(() => {
    const calcularTotal = () => {
      let total: number = 0;
      carrito.forEach((item: Articulo) => {
        total += item.cantidad * item.precioVenta;
      });
      setTotalPedido(total);
    };

    calcularTotal();
  }, [carrito]);

  const addCarrito = (item: Articulo) => {
    const estaEnCarrito = carrito.find(
      (itemCarrito) => itemCarrito.id === item.id
    );

    if (estaEnCarrito) {
      setCarrito(
        carrito.map((itemCarrito) =>
          itemCarrito.id === item.id
            ? { ...itemCarrito, cantidad: itemCarrito.cantidad + 1 }
            : itemCarrito
        )
      );
    } else {
      setCarrito([...carrito, { ...item, cantidad: 1 }]);
    }
  };

  const removeItemCarrito = (item: Articulo) => {
    const estaEnCarrito = carrito.find(
      (itemCarrito) => itemCarrito.id === item.id
    );

    if (estaEnCarrito) {
      if (estaEnCarrito.cantidad === 1) {
        setCarrito(carrito.filter((itemCarrito) => itemCarrito.id !== item.id));
      } else {
        setCarrito(
          carrito.map((itemCarrito) =>
            itemCarrito.id === item.id
              ? { ...itemCarrito, cantidad: itemCarrito.cantidad - 1 }
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
