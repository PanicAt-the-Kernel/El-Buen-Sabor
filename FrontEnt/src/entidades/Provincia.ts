import Pais from "./Pais";

class Provincia {
    id: number = 0;
    nombre: string = '';
    eliminado: boolean = true;
    pais: Pais = new Pais;
}
export default Provincia;