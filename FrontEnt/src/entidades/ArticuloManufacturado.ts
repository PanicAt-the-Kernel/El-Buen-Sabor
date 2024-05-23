import Articulo from "./Articulo";
import ArticuloManufacturadoDetalle from "./ArticuloManufacturadoDetalle";

 
class ArticuloManufacturado extends Articulo {
    id: number = 0;
    eliminado: boolean = false;
    descripcion: string = '';
    tiempoEstimadoMinutos: string = '';
    preparacion: string = '';
    articuloManufacturadoDetalles: ArticuloManufacturadoDetalle[] = [];
}

export default ArticuloManufacturado;