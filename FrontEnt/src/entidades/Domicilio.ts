import Localidad from "./Localidad";

class Domicilio {
    id: number = 0;
    calle : string = '';
    numero : number = 0;
    cp : number = 0; 
    piso : string = ''; 
    nroDepto : string = '';  
    localidad: Localidad = new Localidad;
}

export default Domicilio;