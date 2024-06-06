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

const fetcher = (url: string) => fetch(url).then(res => res.json());

//FUNCIONES GET ALL
export function getAllEmpresas(): SWRResponse<Empresa[], any, any> {
    return useSWR<Empresa[]>(`https://traza-compartida.onrender.com/empresa`, fetcher);
}

export function getAllCategorias(): SWRResponse<Categoria[], any, any> {
    return useSWR<Categoria[]>(`https://traza-compartida.onrender.com/categoria`, fetcher);
}

export function getAllArticulosManufacturados(): SWRResponse<ArticuloManufacturado[], any, any> {
    return useSWR<ArticuloManufacturado[]>(`https://traza-compartida.onrender.com/articuloManufacturado`, fetcher);
}

export function getAllPromociones(): SWRResponse<Promocion[], any, any> {
    return useSWR<Promocion[]>(`https://buensabor-json-server.onrender.com/promociones`, fetcher);
}

export function getAllArticulosInsumos(): SWRResponse<ArticuloInsumo[], any, any> {
    return useSWR<ArticuloInsumo[]>(`https://traza-compartida.onrender.com/articuloInsumo`, fetcher);
}

export function getAllInsumos(): SWRResponse<any, any, any> {
    return useSWR<ArticuloInsumo[]>(`https://traza-compartida.onrender.com/articuloInsumo`, fetcher);
}

export function getAllPaises(): SWRResponse<Pais[], any, any> {
    return useSWR<Pais[]>(`https://traza-compartida.onrender.com/pais`, fetcher);
}

export function getAllUnidadMedida(): SWRResponse<UnidadMedida[], any, any> {
    return useSWR<UnidadMedida[]>(`https://traza-compartida.onrender.com/unidadMedida`, fetcher);
}


//FUNCIONES GET X ID
export function getSucursalesEmpresa(idEmpresa: number): SWRResponse<Sucursal[], any, any> {
    return useSWR<Sucursal[]>(`https://traza-compartida.onrender.com/sucursal/empresa/${idEmpresa}`, fetcher);
}

export function getSucursalId(idSucursal: number): SWRResponse<Sucursal, any, any> {
    return useSWR<Sucursal>(`https://traza-compartida.onrender.com/sucursal/${idSucursal}`, fetcher);
}

export function getProvinciasIdPais(idPais: number): SWRResponse<Provincia[], any, any> {
    return useSWR<Provincia[]>(`https://traza-compartida.onrender.com/provincia/findByPais/${idPais}`, fetcher);
}

export function getLocalidadesIdProvincia(idProvincia: number): SWRResponse<Localidad[], any, any> {
    return useSWR<Localidad[]>(`https://traza-compartida.onrender.com/localidad/findByProvincia/${idProvincia}`, fetcher);
}

export function getLocalidadesId(idLocalidad: number): SWRResponse<Localidad[], any, any> {
    return useSWR<Localidad[]>(`https://traza-compartida.onrender.com/localidad/${idLocalidad}`, fetcher);
}

export function getCategoriasIdSucursal(idSucursal: number): SWRResponse<Categoria[], any, any> {
    return useSWR<Categoria[]>(`https://traza-compartida.onrender.com/categoria/sucursal/${idSucursal}`, fetcher);
}

export function getCategoriaId(idCategoria: number): SWRResponse<Categoria, any, any> {
    return useSWR<Categoria>(`https://traza-compartida.onrender.com/categoria/${idCategoria}`, fetcher);
}

export async function getSucursalIdF(idSucursal: number): Promise<Sucursal> {
    const url = `https://buensabor-json-server.onrender.com/sucursal/${idSucursal}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return new Sucursal;
    }
}

//FUNCIONES SAVE
export async function saveEmpresa(empresa: Empresa){
    //Preparar llamada api
    let options={
        mode:"cors" as RequestMode,
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(empresa)
    }

    //Manejo de errores
    try{
        let response = await fetch("https://traza-compartida.onrender.com/empresa",options);
        if(response.ok){
            alert("Empresa agregada correctamente.");
        }else{
            alert("Error al agregar empresa: "+response.status);
        }
    }catch{
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function saveSucursal(sucursal: Sucursal, empresa: Empresa, idLocalidad: number){
    //Traer localidad
    let localidad;
    try {
        const response = await fetch(`https://traza-compartida.onrender.com/localidad/${idLocalidad}`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        localidad = await response.json();
    } catch (error) {
        //@ts-ignore
        alert(`Error obteniendo la localidad: ${error.message}`);
        return;
    }

    sucursal.domicilio.localidad = localidad;
    sucursal.empresa = empresa;

    //Preparar llamada api
    let options={
        mode:"cors" as RequestMode,
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(sucursal)
    }

    //Manejo de errores
    try{
        let response = await fetch("https://traza-compartida.onrender.com/sucursal",options);
        if(response.ok){
            alert("Sucursal agregada correctamente.");
        }else{
            alert("Error al agregar la sucursal: "+response.status);
        }
    }catch{
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function saveCategoria(categoria: Categoria, idSucursal: number){
    //Traer sucursal
    let sucursal;
    try {
        const response = await fetch(`https://traza-compartida.onrender.com/sucursal/${idSucursal}`);
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
    let options={
        mode:"cors" as RequestMode,
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(categoria)
    }

    //Manejo de errores
    try{
        let response = await fetch("https://traza-compartida.onrender.com/categoria/padre",options);
        if(response.ok){
            alert("Categoría agregada correctamente.");
        }else{
            alert("Error al agregar categoría: "+response.status);
        }
    }catch{
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function saveArticuloManufacturado(articulo: ArticuloManufacturado){
    //Preparar llamada api
    let options={
        mode:"cors" as RequestMode,
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(articulo)
    }

    //Manejo de errores
    try{
        let response = await fetch("https://traza-compartida.onrender.com/articuloManufacturado",options);
        if(response.ok){
            alert("Artículo agregado correctamente.");
        }else{
            alert("Error al agregar artículo: "+response.status);
        }
    }catch{
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function saveArticuloInsumo(articulo: ArticuloInsumo){
    //Preparar llamada api
    let options={
        mode:"cors" as RequestMode,
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(articulo)
    }

    //Manejo de errores
    try{
        let response = await fetch("https://traza-compartida.onrender.com/articuloInsumo",options);
        if(response.ok){
            alert("Artículo agregado correctamente.");
        }else{
            alert("Error al agregar artículo: "+response.status);
        }
    }catch{
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function saveUnidadMedida(uMedida: UnidadMedida){
    //Preparar llamada api
    let options={
        mode:"cors" as RequestMode,
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(uMedida)
    }

    //Manejo de errores
    try{
        let response = await fetch("https://traza-compartida.onrender.com/unidadMedida",options);
        if(response.ok){
            alert("Unidad de medida agregada correctamente.");
        }else{
            alert("Error al agregar unidad de medida: "+response.status);
        }
    }catch{
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function savePedido(pedido: Pedido, setTotalPedido: (total: number) => void, vaciarCarrrito: () => void){
    //Llamada a API
    let options = {
        mode: 'cors' as RequestMode,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pedido)
    }

        //Manejo de errores
        try{
            let response = await fetch("https://magniback.onrender.com/pedidos/fechaActual=2024-06-06&precioDelivery=0.0",options);
            if(response.ok){
                alert("Pedido cargado correctamente.");
                vaciarCarrrito();
                setTotalPedido(0);
            }else{
                alert("Error al cargar pedido: "+response.status);
            }
        }catch{
            alert("Error CORS, Revisa la URL o el back esta mal configurado.")
        }
}

//FUNCIONES EDIT
export async function editEmpresa(empresa: Empresa){
    //Preparar llamada api
    let options={
        mode:"cors" as RequestMode,
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(empresa)
    }
    //Manejo de errores
    try{
        let response = await fetch(`https://traza-compartida.onrender.com/empresa/${empresa.id}`,options);
        if(response.ok){
            alert("Empresa editada correctamente");
        }else{
            alert("Error HTTP: "+response.status);
        }
    }catch{
        alert("Error CORS, Revisa la URL o el back esta mal configurado")
    }
}

export async function editSucursal(sucursal: Sucursal, empresa: Empresa, idLocalidad: number){
    //Traer localidad
    let localidad;
    try {
        const response = await fetch(`https://traza-compartida.onrender.com/localidad/${idLocalidad}`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        localidad = await response.json();
    } catch (error) {
        //@ts-ignore
        alert(`Error obteniendo la localidad: ${error.message}`);
        return;
    }

    sucursal.domicilio.localidad = localidad;
    sucursal.empresa = empresa;

    //Preparar llamada api
    let options={
        mode:"cors" as RequestMode,
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(sucursal)
    }

    //Manejo de errores
    try{
        let response = await fetch(`https://traza-compartida.onrender.com/sucursal/${sucursal.id}`,options);
        if(response.ok){
            alert("Sucursal editada correctamente.");
        }else{
            alert("Error al editar la sucursal: "+response.status);
        }
    }catch{
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function editCategoria(categoria: Categoria){
    //Preparar llamada api
    let options={
        mode:"cors" as RequestMode,
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(categoria)
    }

    //Manejo de errores
    try{
        let response = await fetch(`https://traza-compartida.onrender.com/categoria/padre/${categoria.id}`,options);
        if(response.ok){
            alert("Categoría editada correctamente.");
        }else{
            alert("Error al editar categoría: "+response.status);
        }
    }catch{
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function editArticuloManufacturado(articulo: ArticuloManufacturado){
    //Preparar llamada api
    let options={
        mode:"cors" as RequestMode,
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(articulo)
    }

    //Manejo de errores
    try{
        let response = await fetch(`https://traza-compartida.onrender.com/articuloManufacturado/${articulo.id}`,options);
        if(response.ok){
            alert("Artículo editado correctamente.");
        }else{
            alert("Error al editar artículo: "+response.status);
        }
    }catch{
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function editArticuloInsumo(articulo: ArticuloInsumo){
    //Preparar llamada api
    let options={
        mode:"cors" as RequestMode,
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(articulo)
    }

    //Manejo de errores
    try{
        let response = await fetch(`https://traza-compartida.onrender.com/articuloInsumo/${articulo.id}`,options);
        if(response.ok){
            alert("Artículo editado correctamente.");
        }else{
            alert("Error al editar artículo: "+response.status);
        }
    }catch{
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}

export async function editUnidadMedida(uMedida: UnidadMedida){
    //Preparar llamada api
    let options={
        mode:"cors" as RequestMode,
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(uMedida)
    }

    //Manejo de errores
    try{
        let response = await fetch(`https://traza-compartida.onrender.com/unidadMedida/${uMedida.id}`,options);
        if(response.ok){
            alert("Unidad de medida editada correctamente.");
        }else{
            alert("Error al agregar unidad de medida: "+response.status);
        }
    }catch{
        alert("Error CORS, Revisa la URL o el back esta mal configurado.")
    }
}
