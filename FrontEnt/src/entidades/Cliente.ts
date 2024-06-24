import Domicilio from "./Domicilio";
import ImagenCliente from "./ImagenCliente";
import Pedido from "./Pedido";

class Cliente {
    userName: string = '';
    eliminado: boolean = false;
    fechaBaja: string = '';
    nombre: string = '';
    apellido: string = '';
    telefono: string = '';
    imagenCliente: ImagenCliente = new ImagenCliente;
    domicilios: Domicilio[] = [];
    pedidos: Pedido[] = [];
}

export default Cliente;