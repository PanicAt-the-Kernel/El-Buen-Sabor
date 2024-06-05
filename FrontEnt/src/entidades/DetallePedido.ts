import Articulo from "./Articulo";

class DetallePedido {
    id: number = 0;
    cantidad: number = 0; 
    subTotal: number = 0;
    eliminado: boolean = false;
    articulo: number | null = null;
    promocion: number | null = null;
    articuloAux: Articulo = new Articulo; //Trascient
}

export default DetallePedido;