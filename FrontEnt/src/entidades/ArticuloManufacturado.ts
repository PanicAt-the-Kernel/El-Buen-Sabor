import ArticuloManufacturadoDetalle from "./ArticuloManufacturadoDetalle";
import Categoria from "./Categoria";
import Imagen from "./Imagen";
import UnidadMedida from "./UnidadMedida";

class ArticuloManufacturado {
    id: number = 0;
    denominacion: string = ''; 
    precioVenta: number = 0;
    eliminado: boolean = false;
    categoria: Categoria = new Categoria;
    imagenes: Imagen[] = [];
    unidadMedida: UnidadMedida = new UnidadMedida;
    descripcion: string = '';
    tiempoEstimadoMinutos: string = '';
    preparacion: string = '';
    articuloManufacturadoDetalles: ArticuloManufacturadoDetalle[] = [];
}

export default ArticuloManufacturado;