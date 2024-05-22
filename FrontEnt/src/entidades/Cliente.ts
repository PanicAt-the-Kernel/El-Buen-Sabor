import Pedido from "./Pedido";
import Usuario from "./Usuario";

class Cliente {
    id: number = 0;
    nombre: string = ''; 
    apellido: string = ''; 
    telefono: number = 0; 
    email: string = ''; 
    usuario: Usuario = new Usuario; 
    pedidos: Pedido[] = [];
}

export default Cliente;