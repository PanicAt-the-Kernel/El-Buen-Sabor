import Domicilio from "./Domicilio";
import Imagen from "./Imagen";
import Pedido from "./Pedido";
import Usuario from "./Usuario";

class Cliente {
    id: number = 0;
    nombre: string = ''; 
    apellido: string = '';
    telefono: string = '';
    email: string = ''; 
    eliminado: boolean = false;
    usuario: Usuario = new Usuario; 
    imagenCliente: Imagen = new Imagen;
    domicilios: Domicilio[] = [];
    pedidos: Pedido[] = [];
}

export default Cliente;