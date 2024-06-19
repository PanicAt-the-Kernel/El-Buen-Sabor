import Provincia from "./Provincia";

class Localidad {
    id: number = 0;
    eliminado: boolean = false;
    fechaBaja: string = '';
    nombre: string = '';
    provincia: Provincia = new Provincia;
}
export default Localidad;