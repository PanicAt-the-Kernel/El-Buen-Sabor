import Imagen from "./Imagen";
import UnidadMedida from "./UnidadMedida";

class ArticuloInsumo{
    id:number=0;
    denominacion:string='';
    precioVenta:number=0;
    imagenes:Imagen[]=[];
    unidadMedida:UnidadMedida=new UnidadMedida();
    precioCompra: number=0;
    stockActual:number=0;
    stockMaximo:number=0;
    esParaElaborar:boolean=false;
}
export default ArticuloInsumo;