import ArticuloManufacturado from "./ArticuloManufacturado";

class Categoria {
    id: number = 0;
    denominacion: string = '';
    articulos: ArticuloManufacturado[] = [];
    subCategorias: Categoria[] = [];
}

export default Categoria;