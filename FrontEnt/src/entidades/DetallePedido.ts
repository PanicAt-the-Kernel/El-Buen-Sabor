import Articulo from "./Articulo";

class DetallePedido {
    id: number = 0;
    cantidad: number = 0; 
    subTotal: number = 0;
    eliminado: boolean = false;
    articulo: Articulo = new Articulo;
}

export default DetallePedido;