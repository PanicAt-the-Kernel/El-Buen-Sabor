import ArticuloInsumo from "./ArticuloInsumo";

class ArticuloManufacturadoDetalle {
    id : number = 0;
    cantidad : number = 0;
    eliminado: boolean = false;
    articuloInsumo: ArticuloInsumo = new ArticuloInsumo;
}

export default ArticuloManufacturadoDetalle