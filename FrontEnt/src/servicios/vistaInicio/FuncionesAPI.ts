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

//FUNCIONES GET X ID
export function getSucursalesEmpresa(idEmpresa: number): SWRResponse<Sucursal[], any, any> {
    return useSWR<Sucursal[]>(`https://traza-compartida.onrender.com/sucursal/empresa/${idEmpresa}`, fetcher);
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

/*
Hacer
save/edit categoria
save/edit articuloManufacturado
save/edit articuloInsumo
*/