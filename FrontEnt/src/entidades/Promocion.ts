import Imagen from "./Imagen";
import PromocionDetalle from "./PromocionDetalle";
import Sucursal from "./Sucursal";

class Promocion {
    id: number = 0;
    denominacion: string = '';
    fechaDesde: string = '';
    fechaHasta: string = '';
    horaDesde: string = '';
    eliminado: boolean = false;
    horaHasta: string = '';
    descripcionDescuento: string = '';
    precioPromocional: number = 0;
    tipoPromocion: string = '';
    promocionDetalles: PromocionDetalle[] = [];
    imagenes: Imagen[] = [];
    sucursales: Sucursal[] = [];
}

export default Promocion