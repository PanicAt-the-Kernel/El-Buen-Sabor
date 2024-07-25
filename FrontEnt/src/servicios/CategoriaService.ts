import useSWR, { SWRResponse } from "swr";
import Categoria from "../entidades/Categoria";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function getAllCategoriasPadre(): SWRResponse<Categoria[], any, any> {
  return useSWR<Categoria[]>(
    `https://back-magni-0zhl.onrender.com/categoria/padres`,
    fetcher
  );
}

export function getSubCategoriasPadre(idPadre: number): SWRResponse<Categoria[], any, any> {
  return useSWR<Categoria[]>(
    `https://back-magni-0zhl.onrender.com/categoria/hijas/${idPadre}`,
    fetcher
  );
}

export function getCategoriasPadreIdSucursal(idSucursal: number): SWRResponse<Categoria[], any, any> {
  return useSWR<Categoria[]>(
    `https://back-magni-0zhl.onrender.com/categoria/padres/${idSucursal}`,
    fetcher
  );
}

export function getSubCategoriasPadreIdSucursal(idPadre: number, idSucursal: number): SWRResponse<Categoria[], any, any> {
  return useSWR<Categoria[]>(
    `https://back-magni-0zhl.onrender.com/categoria/${idSucursal}/hijo/${idPadre}`,
    fetcher
  );
}

export async function saveCategoria(categoria: Categoria) {
  //Preparar llamada api
  let options = {
    mode: "cors" as RequestMode,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
  };

  //Manejo de errores
  try {
    let response = await fetch(
      "https://back-magni-0zhl.onrender.com/categoria/padre",
      options
    );
    if (response.ok) {
      alert("Categoría padre agregada correctamente.");
    } else {
      alert("Error al agregar categoría: " + response.status);
    }
  } catch {
    alert("Error CORS, Revisa la URL o el back esta mal configurado.");
  }
}

export async function saveCategoriaHija(categoria: Categoria, idPadre: number) {
  //Preparar llamada api
  let options = {
    mode: "cors" as RequestMode,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
  };

  //Manejo de errores
  try {
    let response = await fetch(
      `https://back-magni-0zhl.onrender.com/categoria/hijo/${idPadre}`,
      options
    );
    if (response.ok) {
      alert("Categoría hija agregada correctamente.");
    } else {
      alert("Error al agregar categoría: " + response.status);
    }
  } catch {
    alert("Error CORS, Revisa la URL o el back esta mal configurado.");
  }
}

export async function editCategoria(categoria: Categoria) {
  //Preparar llamada api
  let options = {
    mode: "cors" as RequestMode,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
  };

  //Manejo de errores
  try {
    let response = await fetch(
      `https://back-magni-0zhl.onrender.com/categoria/padre/${categoria.id}`,
      options
    );
    if (response.ok) {
      alert("Categoría editada correctamente.");
    } else {
      alert("Error al editar categoría: " + response.status);
    }
  } catch {
    alert("Error CORS, Revisa la URL o el back esta mal configurado.");
  }
}

export async function editCategoriaHija(categoria: Categoria) {
  //Preparar llamada api
  let options = {
    mode: "cors" as RequestMode,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
  };

  //Manejo de errores
  try {
    let response = await fetch(
      `https://back-magni-0zhl.onrender.com/categoria/hijo/${categoria.id}`,
      options
    );
    if (response.ok) {
      alert("Categoría hija editada correctamente.");
    } else {
      alert("Error al editar categoría: " + response.status);
    }
  } catch {
    alert("Error CORS, Revisa la URL o el back esta mal configurado.");
  }
}