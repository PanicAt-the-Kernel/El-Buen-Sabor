import Categoria from "./Categoria";
import Domicilio from "./Domicilio";
import Promocion from "./Promocion";

class Sucursal {
    id: number = 0;
    nombre: string = '';
    horarioApertura: string = '';
    horarioCierre: string = '';
    domicilio: Domicilio = new Domicilio;
    promociones: Promocion[] = [];
    categorias: Categoria[] = [];
}

export default Sucursal