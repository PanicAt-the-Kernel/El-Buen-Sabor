import Articulo from "./Articulo";

class PromocionDetalle {
    id: number = 0;
    eliminado: boolean = false;
    fechaBaja: string = '9999-12-31';
    cantidad: number = 0;
    articuloId: number = 0;
    articulo: Articulo = new Articulo;
}

export default PromocionDetalle