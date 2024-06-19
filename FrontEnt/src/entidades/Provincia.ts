import Pais from "./Pais";

class Provincia {
    id: number = 0;
    eliminado: boolean = true;
    fechaBaja: string = '';
    nombre: string = '';
    pais: Pais = new Pais;
}
export default Provincia;