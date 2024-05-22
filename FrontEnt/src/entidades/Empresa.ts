import Sucursal from "./Sucursal";

class Empresa {
    id: number = 0;
    nombre: string = ''; 
    razonSocial: string = '';
    cuil: number = 0; 
    sucursales: Sucursal[] = [];
}

export default Empresa;