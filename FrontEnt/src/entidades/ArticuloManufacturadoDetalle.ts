import ArticuloInsumo from "./ArticuloInsumo";

class ArticuloManufacturadoDetalle {
    id: number = 0;
    eliminado: boolean = false;
    fechaBaja: string = '9999-12-31';
    cantidad: number = 0;
    articuloInsumo: ArticuloInsumo = new ArticuloInsumo;
}

export default ArticuloManufacturadoDetalle