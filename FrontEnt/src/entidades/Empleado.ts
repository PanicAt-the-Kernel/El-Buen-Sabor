import Usuario from "./Usuario";

class Empleado {
    id: number = 0;
    nombre: string = ''; 
    apellido: string = ''; 
    telefono: number = 0; 
    email: string = ''; 
    eliminado: boolean = false;
    usuario: Usuario = new Usuario; 
}

export default Empleado;