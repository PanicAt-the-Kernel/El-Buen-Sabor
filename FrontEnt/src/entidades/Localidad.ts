import Provincia from "./Provincia";

class Localidad {
    id: number = 0;
    eliminado: boolean = false; 
    nombre: string = '';
    provincia: Provincia = new Provincia;
}
export default Localidad;