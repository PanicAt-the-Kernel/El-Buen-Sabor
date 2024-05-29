import Articulo from "./Articulo";
import Sucursal from "./Sucursal";

class Categoria {
    id: number = 0;
    denominacion: string = '';
    articulos: Articulo[] = [];
    subCategorias: Categoria[] = [];
    eliminado:boolean = false;
    sucursales: Sucursal[] = [];
}

export default Categoria;