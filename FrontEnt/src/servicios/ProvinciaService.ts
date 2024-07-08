import useSWR, { SWRResponse } from "swr";
import Provincia from "../entidades/Provincia";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export function getProvinciasIdPais(
  idPais: number
): SWRResponse<Provincia[], any, any> {
  return useSWR<Provincia[]>(
    `https://back-magni-0zhl.onrender.com/provincia/findByPais/${idPais}`,
    fetcher
  );
}

