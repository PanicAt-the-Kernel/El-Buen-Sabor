import Articulo from "./Articulo";
import StockInsumoSucursal from "./StockInsumoSucursal";

class ArticuloInsumo extends Articulo {
    precioCompra: number=0;
    esParaElaborar:boolean=false;
    stocksInsumo:StockInsumoSucursal[]=[];
}
export default ArticuloInsumo;