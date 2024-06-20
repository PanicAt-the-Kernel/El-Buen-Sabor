import Imagen from "./Imagen";
import PromocionDetalle from "./PromocionDetalle";
import Sucursal from "./Sucursal";

class Promocion {
    id: number = 0;
    eliminado: boolean = false;
    fechaBaja: string = '';
    denominacion: string = '';
    fechaDesde: string = '';
    fechaHasta: string = '';
    horaDesde: string = '';
    horaHasta: string = '';
    descripcionDescuento: string = '';
    precioPromocional: number = 0;
    tipoPromocion: string = '';
    promocionDetalles: PromocionDetalle[] = [];
    imagenes: Imagen[] = [];
    sucursales: Sucursal[] = [];
    sucursalesId: number[] = [];
}

export default Promocion