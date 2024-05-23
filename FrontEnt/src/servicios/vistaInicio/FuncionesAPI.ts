import useSWR, { SWRResponse } from "swr";
import ArticuloInsumo from "../../entidades/ArticuloInsumo";
import Categoria from "../../entidades/Categoria";
import Empresa from "../../entidades/Empresa";
import ArticuloManufacturado from "../../entidades/ArticuloManufacturado";
import Sucursal from "../../entidades/Sucursal";
import Promocion from "../../entidades/Promocion";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function getAllEmpresas(): SWRResponse<Empresa[], any, any> {
    return useSWR<Empresa[]>(`https://traza-compartida.onrender.com/empresa`, fetcher);
}

export function getSucursalesEmpresa(idEmpresa: number): SWRResponse<Sucursal[], any, any> {
    return useSWR<Sucursal[]>(`https://traza-compartida.onrender.com/sucursal/empresa/${idEmpresa}`, fetcher);
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

//FUNCIONES SAVE
export async function saveEmpresa(nombre:string,razonSocial:string,cuil:string){
    //Construir el objeto
    let empresa = new Empresa();
    empresa.nombre=nombre;
    empresa.razonSocial=razonSocial;
    empresa.cuil=Number(cuil);

    //Preparar llamada
    let options={
        mode:'cors' as RequestMode,
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(empresa)
    }

    //Manejo de errores
    try{
        const response = await fetch("https://traza-compartida.onrender.com/empresa",options);
        if(response.ok){
            alert("Empresa Guardada");
        }else{
            alert(response.status);
            console.log(response.status);
        }
    }catch{
        alert("Error CORS")
        console.log("La promesa fallo")
    }
}
export async function editEmpresa(id:number,nombre:string,razonSocial:string,cuil:string){
    //Construir el objeto
    let empresa = new Empresa();
    empresa.id=id;
    empresa.nombre=nombre;
    empresa.razonSocial=razonSocial;
    empresa.cuil=Number(cuil);

    //Preparar llamada
    let options={
        mode:'cors' as RequestMode,
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(empresa)
    }

    //Manejo de errores
    try{
        const response = await fetch(`https://traza-compartida.onrender.com/empresa/${id}`,options);
        if(response.ok){
            alert("Empresa Editada");
        }else{
            alert("Error HTTP: "+response.status);
        }
    }catch{
        alert("Error CORS")
    }
}
/*
Hacer
save/edit empresa
save/edit sucursal

Pendientes
save/edit categoria
save/edit articuloManufacturado
save/edit articuloInsumo
*/