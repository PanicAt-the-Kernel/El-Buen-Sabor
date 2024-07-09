import Cliente from "./Cliente";
import DetallePedido from "./DetallePedido";
import Domicilio from "./Domicilio";
import Empleado from "./Empleado";
import Factura from "./Factura";
import Sucursal from "./Sucursal";

class Pedido {
    id: number = 0;
    eliminado: boolean = false;
    fechaBaja: string = '9999-12-31';
    horaEstimadaFinalizacion: string | null = '';
    total: number | null = 0;
    totalCosto: number | null = 0;
    estado: string | null = '';
    tipoEnvio: string | null = '';
    formaPago: string | null = '';
    fechaPedido: string | null = '';
    domicilio: Domicilio | null = new Domicilio;
    sucursal: Sucursal | null = new Sucursal;
    factura: Factura | null = new Factura;
    cliente: Cliente | null = new Cliente;
    detallePedidos: DetallePedido[] = [];
    empleado: Empleado|null = new Empleado;
}

export default Pedido