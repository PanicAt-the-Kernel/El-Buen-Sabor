import useSWR, { SWRResponse } from "swr";
import ArticuloInsumo from "../../entidades/ArticuloInsumo";

const fetcher = (url:string) => fetch(url).then(res => res.json());

export function getAllInsumos():SWRResponse<any,any,any>{
    return useSWR<ArticuloInsumo[]>("https://buensabor-json-server.onrender.com/articulosInsumos",fetcher);
}