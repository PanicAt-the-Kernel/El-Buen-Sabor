import ArticuloInsumo from "./ArticuloInsumo";
import ArticuloManufacturado from "./ArticuloManufacturado";
import Sucursal from "./Sucursal";

class Categoria {
    id: number = 0;
    denominacion: string = '';
    articulosManofacturado: ArticuloManufacturado[] = [];
    articulosInsumo: ArticuloInsumo[] = [];
    subCategorias: Categoria[] = [];
    eliminado:boolean = false;
    sucursales: Sucursal[] = [];
}

export default Categoria;