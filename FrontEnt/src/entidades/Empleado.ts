import ImagenEmpleado from "./ImagenEmpleado";
import Sucursal from "./Sucursal";
import UsuarioEmpleado from "./UsuarioEmpleado";

class Empleado {
    id: number = 0;
    eliminado: boolean = false;
    tipoEmpleado: string = '';
    nombre: string = ''; 
    apellido: string = ''; 
    telefono: string = '';
    email: string = ''; 
    fechaNacimiento: string = '';
    usuarioEmpleado: UsuarioEmpleado = new UsuarioEmpleado; 
    imagenEmpleado: ImagenEmpleado = new ImagenEmpleado;
    sucursal: Sucursal = new Sucursal;
}

export default Empleado;