import Domicilio from "./Domicilio";
import ImagenCliente from "./ImagenCliente";
import Pedido from "./Pedido";

class Cliente {
    id: number = 0;
    eliminado: boolean = false;
    fechaBaja: string = '';
    nombre: string = '';
    apellido: string = '';
    telefono: string = '';
    userName: string="";
    imagenCliente: ImagenCliente = new ImagenCliente;
    domicilios: Domicilio[] = [];
    pedidos: Pedido[] = [];
}

export default Cliente;