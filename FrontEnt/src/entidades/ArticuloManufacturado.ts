import Articulo from "./Articulo";
import ArticuloManufacturadoDetalle from "./ArticuloManufacturadoDetalle";
import Sucursal from "./Sucursal.ts";

class ArticuloManufacturado extends Articulo {
    descripcion: string = '';
    tiempoEstimadoMinutos: number = 0;
    preparacion: string = '';
    articuloManufacturadoDetalles: ArticuloManufacturadoDetalle[] = [];
    sucursales: Sucursal[] = [];
}

export default ArticuloManufacturado;