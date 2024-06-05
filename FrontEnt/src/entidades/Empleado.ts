import Imagen from "./Imagen";
import Sucursal from "./Sucursal";
import Usuario from "./Usuario";

class Empleado {
    id: number = 0;
    eliminado: boolean = false;
    tipoEmpleado: string = '';
    nombre: string = ''; 
    apellido: string = ''; 
    telefono: string = '';
    email: string = ''; 
    fechaNacimiento: string = '';
    usuarioEmpleado: Usuario = new Usuario; 
    imagenEmpleado: Imagen = new Imagen;
    sucursal: Sucursal = new Sucursal;
}

export default Empleado;