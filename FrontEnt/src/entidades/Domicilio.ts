import Localidad from "./Localidad";

class Domicilio {
    id: number = 0;
    calle : string = '';
    numero : number = 0;
    cp : number = 0; 
    piso : number = 0; 
    nroDpto : number = 0;  
    eliminado: boolean = false;
    localidad: Localidad = new Localidad();
}

export default Domicilio;