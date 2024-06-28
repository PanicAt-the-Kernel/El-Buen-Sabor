import useSWR, { SWRResponse } from "swr";
import ArticuloInsumo from "../entidades/ArticuloInsumo";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function getAllInsumos(
  token: string | null
): SWRResponse<ArticuloInsumo[], any, any> {
  if (token != null) {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const fetcher2 = (url: string) =>
      fetch(url, options).then((res) => res.json());
    return useSWR<ArticuloInsumo[]>(
      "https://traza-final.onrender.com/articuloInsumo",
      fetcher2,
      { refreshInterval: 3600 }
    );
  }
  //Si el token es null ponemos en pausa a la funcion fetch
  return useSWR<ArticuloInsumo[]>(null, fetcher);
}

export function getAllArticuloInsumoElab(): SWRResponse<
  ArticuloInsumo[],
  any,
  any
> {
  return useSWR<ArticuloInsumo[]>(
    `https://traza-final.onrender.com/articuloInsumo/elaborados`,
    fetcher
  );
}

export function getAllArticuloInsumoNoElab(): SWRResponse<
  ArticuloInsumo[],
  any,
  any
> {
  return useSWR<ArticuloInsumo[]>(
    `https://traza-final.onrender.com/articuloInsumo/noElaborados`,
    fetcher
  );
}

export async function saveArticuloInsumo(articulo: ArticuloInsumo, token: string | null) {
  //Preparar llamada api
  if (token != null) {
    let options = {
      mode: "cors" as RequestMode,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(articulo),
    };
  
    //Manejo de errores
   
  //Manejo de errores
  try {
    let response = await fetch(
      "https://traza-final.onrender.com/articuloInsumo",
      options
    );
    if (response.ok) {
      alert("Artículo agregado correctamente.");
    } else {
      alert("Error al agregar artículo: " + response.status);
    }
  } catch {
    alert("Error CORS, Revisa la URL o el back esta mal configurado.");
  }
} else {
  alert("No estas Autorizado para ejecutar esta accion")
   
}
}

export async function editArticuloInsumo(articulo: ArticuloInsumo,token: string | null) {
  //Preparar llamada api
  if(token) {
    let options = {
      mode: "cors" as RequestMode,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(articulo),
    };
  
    //Manejo de errores
    try {
      let response = await fetch(
        `https://traza-final.onrender.com/articuloInsumo/${articulo.id}`,
        options
      );
      if (response.ok) {
        alert("Artículo editado correctamente.");
      } else {
        alert("Error al editar artículo: " + response.status);
      }
    } catch {
      alert("Error CORS, Revisa la URL o el back esta mal configurado.");
    }
  } else {
    alert("No estas Autorizado para ejecutar esta accion")
  }
  
}
