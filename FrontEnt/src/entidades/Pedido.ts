import DetallePedido from "./DetallePedido";
import Domicilio from "./Domicilio";
import Factura from "./Factura";
import Sucursal from "./Sucursal";

class Pedido {
    id: number = 0;
    horaEstimadaFinalizacion: string = '';
    total: number = 0;
    totalCosto: number = 0;
    eliminado: boolean = false;
    estado: string = ''; 
    tipoEnvio: string = ''; 
    formaPago: string = ''; 
    fechaPedido: string = ''; 
    domicilio: Domicilio = new Domicilio;
    sucursal: Sucursal = new Sucursal;
    factura: Factura = new Factura;
    detallePedido: DetallePedido = new DetallePedido;
}

export default Pedido