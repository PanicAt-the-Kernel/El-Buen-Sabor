import Articulo from "./Articulo";
import Promocion from "./Promocion";

class DetallePedido {
    id: number = 0;
    eliminado: boolean = false;
    fechaBaja: string = '';
    cantidad: number = 0;
    subTotal: number = 0;
    articulo: number | null = null;
    promocion: number | null = null;
    articuloAux: Articulo = new Articulo; //Trascient
    promocionAux: Promocion = new Promocion; //Trascient
}

export default DetallePedido;