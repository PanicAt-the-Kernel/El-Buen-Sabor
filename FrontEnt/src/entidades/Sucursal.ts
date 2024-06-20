import Categoria from "./Categoria";
import Domicilio from "./Domicilio";
import Empresa from "./Empresa";
import Promocion from "./Promocion";

class Sucursal {
    id: number = 0;
    eliminado: boolean = false;
    fechaBaja: string = '';
    nombre: string = '';
    horarioApertura: string = '';
    horarioCierre: string = '';
    domicilio: Domicilio = new Domicilio;
    promociones: Promocion[] = [];
    categorias: Categoria[] = [];
    empresa: Empresa = new Empresa;
    esCasaMatriz: boolean = false;
}

export default Sucursal