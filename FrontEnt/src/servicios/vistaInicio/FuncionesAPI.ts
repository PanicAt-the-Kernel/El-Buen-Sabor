import useSWR, { SWRResponse } from "swr";
import ArticuloInsumo from "../../entidades/ArticuloInsumo";
import Categoria from "../../entidades/Categoria";
import Empresa from "../../entidades/Empresa";
import ArticuloManufacturado from "../../entidades/ArticuloManufacturado";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function getAllEmpresas(): SWRResponse<Empresa[], any, any> {
    return useSWR<Empresa[]>(`https://buensabor-json-server.onrender.com/empresas`, fetcher);
}

export function getAllCategorias(): SWRResponse<Categoria[], any, any> {
    return useSWR<Categoria[]>(`https://buensabor-json-server.onrender.com/categorias`, fetcher);
}

export function getAllArticulosManufacturados(): SWRResponse<ArticuloManufacturado[], any, any> {
    return useSWR<ArticuloManufacturado[]>(`https://buensabor-json-server.onrender.com/articulosManufacturados`, fetcher);
}

export function getAllArticulosInsumos(): SWRResponse<ArticuloInsumo[], any, any> {
    return useSWR<ArticuloInsumo[]>(`https://buensabor-json-server.onrender.com/articulosInsumos`, fetcher);
}

export function getAllInsumos(): SWRResponse<any, any, any> {
    return useSWR<ArticuloInsumo[]>(`https://buensabor-json-server.onrender.com/articulosInsumos`, fetcher);
}

/*
save categoria
search categoria
save empresa
search empresa
save articuloManufacturado
search articuloManufacturado
save articuloInsumo
search articuloInsumo
*/