import Domicilio from "./Domicilio";
import ImagenCliente from "./ImagenCliente";
import Pedido from "./Pedido";
import Usuario from "./Usuario";

class Cliente {
    id: number = 0;
    eliminado: boolean = false;
    nombre: string = ''; 
    apellido: string = '';
    telefono: string = '';
    email: string = ''; 
    usuario: Usuario = new Usuario; 
    imagenCliente: ImagenCliente = new ImagenCliente;
    domicilios: Domicilio[] = [];
    pedidos: Pedido[] = [];
}

export default Cliente;