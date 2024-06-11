import Articulo from "./Articulo";

class PromocionDetalle {
    id: number = 0;
    eliminado: boolean = false;
    cantidad: number = 0;
    articulo: Articulo = new Articulo;
}

export default PromocionDetalle