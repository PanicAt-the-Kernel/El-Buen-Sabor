import useSWR, { SWRResponse } from "swr";
import ArticuloInsumo from "../../entidades/ArticuloInsumo";
import Categoria from "../../entidades/Categoria";
import Empresa from "../../entidades/Empresa";
import ArticuloManufacturado from "../../entidades/ArticuloManufacturado";
import Sucursal from "../../entidades/Sucursal";
import Promocion from "../../entidades/Promocion";
import Pais from "../../entidades/Pais";
import Provincia from "../../entidades/Provincia";
import Localidad from "../../entidades/Localidad";
import UnidadMedida from "../../entidades/UnidadMedida";
import Pedido from "../../entidades/Pedido";
import Factura from "../../entidades/Factura";
import Usuario from "../../entidades/Usuario";
import DetallePedido from "../../entidades/DetallePedido";
import Empleado from "../../entidades/Empleado";

const fetcher = (url: string) => fetch(url).then(res => res.json());

//FUNCIONES GET ALL
export function getAllEmpresas(): SWRResponse<Empresa[], any, any> {
    return useSWR<Empresa[]>(`https://traza-final.onrender.com/empresa`, fetcher);
}

export function getAllEmpleados(): SWRResponse<Empleado[], any, any> {
    return useSWR<Empleado[]>(`https://traza-final.onrender.com/empleado`, fetcher);
}

export function getAllCategorias(): SWRResponse<Categoria[], any, any> {
    return useSWR<Categoria[]>(`https://traza-final.onrender.com/categoria`, fetcher);
}

export function getAllArticulosManufacturados(): SWRResponse<ArticuloManufacturado[], any, any> {
    return useSWR<ArticuloManufacturado[]>(`https://traza-final.onrender.com/articuloManufacturado`, fetcher);
}

export function getAllInsumos(): SWRResponse<ArticuloInsumo[], any, any> {
    return useSWR<ArticuloInsumo[]>(`https://traza-final.onrender.com/articuloInsumo`, fetcher);
}

export function getAllPaises(): SWRResponse<Pais[], any, any> {
    return useSWR<Pais[]>(`https://traza-final.onrender.com/pais`, fetcher);
}

export function getAllUnidadMedida(): SWRResponse<UnidadMedida[], any, any> {
    return useSWR<UnidadMedida[]>(`https://traza-final.onrender.com/unidadMedida`, fetcher);
}

export function getAllSucursales(): SWRResponse<Sucursal[], any, any> {
    return useSWR<Sucursal[]>("https://traza-final.onrender.com/sucursal", fetcher)
}

export function getAllPedidos(): SWRResponse<Pedido[], any, any> {
    return useSWR<Pedido[]>("https://traza-final.onrender.com/pedidos", fetcher)
}

export function getAllArticuloInsumoElab(): SWRResponse<ArticuloInsumo[], any, any> {
    return useSWR<ArticuloInsumo[]>(`https://traza-final.onrender.com/articuloInsumo/elaborados`, fetcher);
}

export function getAllArticuloInsumoNoElab(): SWRResponse<ArticuloInsumo[], any, any> {
    return useSWR<ArticuloInsumo[]>(`https://traza-final.onrender.com/articuloInsumo/noElaborados`, fetcher);
}

//FUNCIONES GET X ID
export function getSucursalesEmpresa(idEmpresa: number): SWRResponse<Sucursal[], any, any> {
    return useSWR<Sucursal[]>(`https://traza-final.onrender.com/sucursal/empresa/${idEmpresa}`, fetcher);
}

export function getSucursalId(idSucursal: number): SWRResponse<Sucursal, any, any> {
    return useSWR<Sucursal>(`https://traza-final.onrender.com/sucursal/${idSucursal}`, fetcher);
}

export function getProvinciasIdPais(idPais: number): SWRResponse<Provincia[], any, any> {
    return useSWR<Provincia[]>(`https://traza-final.onrender.com/provincia/findByPais/${idPais}`, fetcher);
}

export function getLocalidadesIdProvincia(idProvincia: number): SWRResponse<Localidad[], any, any> {
    return useSWR<Localidad[]>(`https://traza-final.onrender.com/localidad/findByProvincia/${idProvincia}`, fetcher);
}

export function getLocalidadesId(idLocalidad: number): SWRResponse<Localidad[], any, any> {
    return useSWR<Localidad[]>(`https://traza-final.onrender.com/localidad/${idLocalidad}`, fetcher);
}

export function getCategoriaId(idCategoria: number): SWRResponse<Categoria, any, any> {
    return useSWR<Categoria>(`https://traza-final.onrender.com/categoria/${idCategoria}`, fetcher);
}

export function getCategoriasIdSucursal(idSucursal: number): SWRResponse<Categoria[], any, any> {
    return useSWR<Categoria[]>(`https://traza-final.onrender.com/categoria/sucursal/${idSucursal}`, fetcher);
}

export function getPromocionesIdSucursal(idSucursal: number): SWRResponse<Promocion[], any, any> {
    return useSWR<Promocion[]>(`https://traza-final.onrender.com/promocion/sucursal/${idSucursal}`, fetcher);
}

//FUNCIONES SAVE
export async function saveEmpleado(empleado: Empleado) {
    //Preparar llamada api
    empleado.sucursal = localData.getSucursal("sucursal")
    const options = {
        mode: "cors" as RequestMode,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(empleado)
    }

    //Manejo de errores
    try {
        let response = await fetch("https://traza-final.onrender.com/empleado", options);
        if (response.ok) {
            alert("Empleado agregado correctamente.");
        } else {
            alert("Error al agregar empleado: " + response.status);
        }
    } catch {
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function saveEmpresa(empresa: Empresa) {
    //Preparar llamada api
    let options = {
        mode: "cors" as RequestMode,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(empresa)
    }

    //Manejo de errores
    try {
        let response = await fetch("https://traza-final.onrender.com/empresa", options);
        if (response.ok) {
            alert("Empresa agregada correctamente.");
        } else {
            alert("Error al agregar empresa: " + response.status);
        }
    } catch {
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function saveSucursal(sucursal: Sucursal) {
    //Preparar llamada api
    let options = {
        mode: "cors" as RequestMode,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sucursal)
    }

    //Manejo de errores
    try {
        let response = await fetch("https://traza-final.onrender.com/sucursal", options);
        if (response.ok) {
            alert("Sucursal agregada correctamente.");
        } else {
            alert("Error al agregar la sucursal: " + response.status);
        }
    } catch {
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function saveCategoria(categoria: Categoria, idSucursal: number) {
    //Traer sucursal
    let sucursal;
    try {
        const response = await fetch(`https://traza-final.onrender.com/sucursal/${idSucursal}`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        sucursal = await response.json();
    } catch (error) {
        //@ts-ignore
        alert(`Error obteniendo la sucursal: ${error.message}`);
        return;
    }

    categoria.sucursales.push(sucursal);

    //Preparar llamada api
    let options = {
        mode: "cors" as RequestMode,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categoria)
    }

    //Manejo de errores
    try {
        let response = await fetch("https://traza-final.onrender.com/categoria/padre", options);
        if (response.ok) {
            alert("Categoría agregada correctamente.");
        } else {
            alert("Error al agregar categoría: " + response.status);
        }
    } catch {
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function saveArticuloManufacturado(articulo: ArticuloManufacturado) {
    //Preparar llamada api
    let options = {
        mode: "cors" as RequestMode,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(articulo)
    }

    //Manejo de errores
    try {
        let response = await fetch("https://traza-final.onrender.com/articuloManufacturado", options);
        if (response.ok) {
            alert("Artículo agregado correctamente.");
        } else {
            alert("Error al agregar artículo: " + response.status);
        }
    } catch {
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function saveArticuloInsumo(articulo: ArticuloInsumo) {
    //Preparar llamada api
    let options = {
        mode: "cors" as RequestMode,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(articulo)
    }

    //Manejo de errores
    try {
        let response = await fetch("https://traza-final.onrender.com/articuloInsumo", options);
        if (response.ok) {
            alert("Artículo agregado correctamente.");
        } else {
            alert("Error al agregar artículo: " + response.status);
        }
    } catch {
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function saveUnidadMedida(uMedida: UnidadMedida) {
    //Preparar llamada api
    let options = {
        mode: "cors" as RequestMode,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(uMedida)
    }

    //Manejo de errores
    try {
        let response = await fetch("https://traza-final.onrender.com/unidadMedida", options);
        if (response.ok) {
            alert("Unidad de medida agregada correctamente.");
        } else {
            alert("Error al agregar unidad de medida: " + response.status);
        }
    } catch {
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function saveUsuario(nombreUsuario: string, password: string) {
    let usuario = new Usuario();
    usuario.userName = nombreUsuario;
    usuario.password = password;
    let options = {
        mode: "cors" as RequestMode,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    }
    try {
        let response = await fetch("https://traza-final.onrender.com/guardarUsuario", options);
        if (response.ok) {
            alert("Usuario Registrado Correctamente");
            let usuario = await response.json();
            console.log(usuario);
        } else {
            alert("Error al registrar")
        }
    } catch {
        alert("Ocurrio un error CORS")
    }

}

export async function savePedido(pedido: Pedido, setTotalPedido: (total: number) => void, vaciarCarrrito: () => void, totalEnvio: number) {
    const fetchData = async (url: string) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
    };

    try {
        const [domicilio, sucursal, empleado, clientes] = await Promise.all([
            fetchData('https://traza-final.onrender.com/domicilio/1'),
            fetchData('https://traza-final.onrender.com/sucursal/1'),
            fetchData('https://traza-final.onrender.com/empleado/1'),
            fetchData('https://traza-final.onrender.com/cliente')
        ]);

        let factura = new Factura;

        factura.eliminado = false;
        factura.fechaFacturacion = "2024-06-03";
        factura.mpPaymentId = 425;
        factura.mpMerchantOrderId = 609;
        factura.mpPreferenceId = "MP-3065";
        factura.mpPaymentType = "Tipo8";
        factura.formaPago = "EFECTIVO";
        factura.totalVenta = 270.0;

        pedido.domicilio = domicilio;
        pedido.sucursal = sucursal;
        pedido.empleado = empleado;
        pedido.cliente = clientes[0];
        pedido.factura = factura;

        const options = {
            mode: 'cors' as RequestMode,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pedido)
        };

        const hoy = new Date();
        const anio = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');
        const fecha = `${anio}-${mes}-${dia}`;
        const horas = String(hoy.getHours()).padStart(2, '0');
        const minutos = String(hoy.getMinutes()).padStart(2, '0');
        const segundos = String(hoy.getSeconds()).padStart(2, '0');
        const horaActual = `${horas}:${minutos}:${segundos}`;

        const response = await fetch(`https://traza-final.onrender.com/pedidos?fechaActual=${fecha}&horaActual=${horaActual}&precioDelivery=${totalEnvio}`, options);
        if (response.ok) {
            alert("Pedido cargado correctamente.");
            vaciarCarrrito();
            setTotalPedido(0);
        } else {
            alert("Error al cargar pedido: " + response.status);
        }
    } catch (error) {
        //@ts-ignore
        alert(`Error: ${error.message}`);
    }
}

export async function savePromocion(promocion: Promocion) {
    //Preparar llamada api
    let options = {
        mode: "cors" as RequestMode,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(promocion)
    }

    //Manejo de errores
    try {
        let response = await fetch("https://traza-final.onrender.com/promocion", options);
        if (response.ok) {
            alert("Promoción agregada correctamente.");
        } else {
            alert("Error al agregar promoción: " + response.status);
        }
    } catch {
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

//FUNCIONES EDIT
export async function editEmpresa(empresa: Empresa) {
    //Preparar llamada api
    let options = {
        mode: "cors" as RequestMode,
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(empresa)
    }
    //Manejo de errores
    try {
        let response = await fetch(`https://traza-final.onrender.com/empresa/${empresa.id}`, options);
        if (response.ok) {
            alert("Empresa editada correctamente");
        } else {
            alert("Error HTTP: " + response.status);
        }
    } catch {
        alert("Error CORS, Revisa la URL o el back esta mal configurado")
    }
}

export async function editEmpleado(empleado: Empleado) {
    //Preparar llamada api
    let options = {
        mode: "cors" as RequestMode,
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(empleado)
    }
    //Manejo de errores
    try {
        let response = await fetch(`https://traza-final.onrender.com/empleado/${empleado.id}`, options);
        if (response.ok) {
            alert("Empleado editado correctamente");
        } else {
            alert("Error HTTP: " + response.status);
        }
    } catch {
        alert("Error CORS, Revisa la URL o el back esta mal configurado")
    }
}

export async function editSucursal(sucursal: Sucursal) {
    //Preparar llamada api
    let options = {
        mode: "cors" as RequestMode,
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sucursal)
    }

    //Manejo de errores
    try {
        let response = await fetch(`https://traza-final.onrender.com/sucursal/${sucursal.id}`, options);
        if (response.ok) {
            alert("Sucursal editada correctamente.");
        } else {
            alert("Error al editar la sucursal: " + response.status);
        }
    } catch {
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function editCategoria(categoria: Categoria) {
    //Preparar llamada api
    let options = {
        mode: "cors" as RequestMode,
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categoria)
    }

    //Manejo de errores
    try {
        let response = await fetch(`https://traza-final.onrender.com/categoria/padre/${categoria.id}`, options);
        if (response.ok) {
            alert("Categoría editada correctamente.");
        } else {
            alert("Error al editar categoría: " + response.status);
        }
    } catch {
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function editArticuloManufacturado(articulo: ArticuloManufacturado) {
    //Preparar llamada api
    let options = {
        mode: "cors" as RequestMode,
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(articulo)
    }

    //Manejo de errores
    try {
        let response = await fetch(`https://traza-final.onrender.com/articuloManufacturado/${articulo.id}`, options);
        if (response.ok) {
            alert("Artículo editado correctamente.");
        } else {
            alert("Error al editar artículo: " + response.status);
        }
    } catch {
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function editArticuloInsumo(articulo: ArticuloInsumo) {
    //Preparar llamada api
    let options = {
        mode: "cors" as RequestMode,
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(articulo)
    }

    //Manejo de errores
    try {
        let response = await fetch(`https://traza-final.onrender.com/articuloInsumo/${articulo.id}`, options);
        if (response.ok) {
            alert("Artículo editado correctamente.");
        } else {
            alert("Error al editar artículo: " + response.status);
        }
    } catch {
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function editUnidadMedida(uMedida: UnidadMedida) {
    //Preparar llamada api
    let options = {
        mode: "cors" as RequestMode,
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(uMedida)
    }

    //Manejo de errores
    try {
        let response = await fetch(`https://traza-final.onrender.com/unidadMedida/${uMedida.id}`, options);
        if (response.ok) {
            alert("Unidad de medida editada correctamente.");
        } else {
            alert("Error al agregar unidad de medida: " + response.status);
        }
    } catch {
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function editPromocion(promocion: Promocion) {
    //Preparar llamada api
    let options = {
        mode: "cors" as RequestMode,
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(promocion)
    }

    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    const fecha = `${anio}-${mes}-${dia}`;

    //Manejo de errores
    try {
        let response = await fetch(`https://traza-final.onrender.com/promocion/${promocion.id}?fechaActual=${fecha}`, options);
        if (response.ok) {
            alert("Promoción editada correctamente.");
        } else {
            alert("Error al editar promoción: " + response.status);
        }
    } catch {
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function editPedido(id: number, estado: string) {
    // Preparar llamada API
    let options = {
        mode: "cors" as RequestMode,
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(estado)
    };

    // Manejo de errores
    try {
        let response = await fetch(`https://traza-final.onrender.com/pedidos/${id}`, options);
        if (response.ok) {
            alert("Pedido actualizado correctamente.");
        } else {
            alert("Error al actualizar pedido: " + response.status);
        }
    } catch (error) {
        alert("Error CORS, Revisa la URL o el back está mal configurado.");
    }
}

//Manejo LocalStorage
export const localData = {
    setUsuario(key: string, value: Usuario) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getUsuario(key: string) {
        const userStored = localStorage.getItem(key);
        return userStored == null ? null : JSON.parse(userStored);
    },
    removeUsuario(key: string) {
        localStorage.removeItem(key);
    },
    setSucursal(key: string, value: Sucursal) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    getSucursal(key: string) {
        const sucursalStored = localStorage.getItem(key);
        return sucursalStored == null ? null : JSON.parse(sucursalStored);
    },
    removeSucursal(key: string) {
        localStorage.removeItem(key)
    },
    setCarrito(key: string, value: DetallePedido[]) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    getCarrito(key: string) {
        const carritoStored = localStorage.getItem(key);
        return carritoStored == null ? null : JSON.parse(carritoStored);
    },
    removeCarrito(key: string) {
        localStorage.removeItem(key);
    }
}
