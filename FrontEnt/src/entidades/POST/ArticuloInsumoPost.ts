import Categoria from "../Categoria";
import Imagen from "../Imagen";
import UnidadMedida from "../UnidadMedida";

class ArticuloInsumoPOST{
    id:number=0;
    eliminado:boolean=false;
    fechaBaja:string="9999-12-31";
    precioVenta:number=0;
    imagenes:Imagen[]=[];
    unidadMedida:UnidadMedida=new UnidadMedida();
    categoria:Categoria=new Categoria();
    precioCompra:number=0;
    esParaElaborar:boolean=false;
    stocksInsumo:   
}