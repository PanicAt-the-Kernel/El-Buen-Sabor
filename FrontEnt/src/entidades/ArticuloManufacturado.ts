import ArticuloManufacturadoDetalle from "./ArticuloManufacturadoDetalle";
import Imagen from "./Imagen";
import UnidadMedida from "./UnidadMedida";

class ArticuloManufacturado {
    id: number = 0;
    denominacion: string = ''; 
    precioVenta: number = 0;
    imagenes: Imagen[] = [];
    unidadMedida: UnidadMedida = new UnidadMedida;
    descripcion: string = '';
    tiempoEstimadoMinutos: string = '';
    preparacion: string = '';
    articuloManufacturadoDetalles: ArticuloManufacturadoDetalle[] = [];
}

export default ArticuloManufacturado;