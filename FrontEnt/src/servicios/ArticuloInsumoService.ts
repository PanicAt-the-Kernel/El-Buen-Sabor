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
      "https://traza-ending.onrender.com/articuloInsumo",
      fetcher2
    );
  }
  //Si el token es null ponemos en pausa a la funcion fetch
  return useSWR<ArticuloInsumo[]>(null, fetcher);
}

export function getInsumosPorSucursal(idSucursal: number) {
  return useSWR<ArticuloInsumo[]>(
    `https://traza-ending.onrender.com/articuloInsumo/sucursal/${idSucursal}`,
    fetcher
  );
}

export function getAllArticuloInsumoElab(idSucursal: number): SWRResponse<
  ArticuloInsumo[],
  any,
  any
> {
  return useSWR<ArticuloInsumo[]>(
    `https://traza-ending.onrender.com/articuloInsumo/elaborados/sucursal/${idSucursal}`,
    fetcher
  );
}

export function getAllArticuloInsumoNoElab(idSucursal: number): SWRResponse<
  ArticuloInsumo[],
  any,
  any
> {
  return useSWR<ArticuloInsumo[]>(
    `https://traza-ending.onrender.com/articuloInsumo/noElaborados/sucursal/${idSucursal}`,
    fetcher
  );
}

export function getArticuloInsumoNoElabIdSucursal(idSucursal: number): SWRResponse<
  ArticuloInsumo[],
  any,
  any
> {
  return useSWR<ArticuloInsumo[]>(
    `https://traza-ending.onrender.com/articuloInsumo/noElaborados/sucursal/${idSucursal}`,
    fetcher
  );
}

export async function saveArticuloInsumo(articulo: ArticuloInsumo) {
  //Preparar llamada api
  let options = {
    mode: "cors" as RequestMode,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articulo),
  };

  //Manejo de errores
  try {
    let response = await fetch(
      "https://traza-ending.onrender.com/articuloInsumo",
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
}

export async function editArticuloInsumo(articulo: ArticuloInsumo) {
  //Preparar llamada api
  let options = {
    mode: "cors" as RequestMode,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articulo),
  };

  //Manejo de errores
  try {
    let response = await fetch(
      `https://traza-ending.onrender.com/articuloInsumo/${articulo.id}`,
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
}
