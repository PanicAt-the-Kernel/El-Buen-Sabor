import ArticuloInsumo from "./ArticuloInsumo";
import Sucursal from "./Sucursal";

class StockInsumoSucursal{
    id:number=0;
    eliminado:boolean=false;
    fechaBaja:string="9999-12-31";
    stockActual:number=0;
    stockMinimo:number=0;
    stockMaximo:number=0;
    articuloInsumo:ArticuloInsumo=new ArticuloInsumo;
    sucursal:Sucursal=new Sucursal;
}
export default StockInsumoSucursal;