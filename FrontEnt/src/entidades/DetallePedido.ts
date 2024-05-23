import ArticuloInsumo from "./ArticuloInsumo";
import ArticuloManufacturado from "./ArticuloManufacturado";

class DetallePedido {
    id: number = 0;
    cantidad: number = 0; 
    subtotal: number = 0;
    eliminado: boolean = false;
    articuloManufacturado: ArticuloManufacturado = new ArticuloManufacturado;
    articuloInsumo: ArticuloInsumo = new ArticuloInsumo;
}

export default DetallePedido;