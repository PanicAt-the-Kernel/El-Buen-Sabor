import useSWR, { SWRResponse } from "swr";
import Empleado from "../entidades/Empleado";
import { localData } from "./FuncionesAPI";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

//  Authorization: `Bearer ${token}`,


export function getAllEmpleados(token: string | null):
 SWRResponse<Empleado[], any, any> {
  if(token != null) {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const fetcher2 = (url: string) =>
      fetch(url, options).then((res) => res.json());
    return useSWR<Empleado[]>(
      `https://traza-final.onrender.com/empleado`,
      fetcher2,
      { refreshInterval: 3600 }
    );
  } else {
    return useSWR<Empleado[]>(null,fetcher)
  }
  
}

export async function saveEmpleado(empleado: Empleado, token: string | null ) {
  //Preparar llamada api
  empleado.sucursal = localData.getSucursal("sucursal");
  const options = {
    mode: "cors" as RequestMode,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(empleado),
  };

  if(token != null) {
    try {
      let response = await fetch(
        "https://traza-final.onrender.com/empleado",
        options
      );
      if (response.ok) {
        alert("Empleado agregado correctamente.");
      } else {
        alert("Error al agregar empleado: " + response.status);
      }
    } catch {
      alert("Error CORS, Revisa la URL o el back esta mal configurado.");
    }
  } else {
    alert("Acceso no autorizado");
  }
  
}

export async function editEmpleado(empleado: Empleado, token: string | null) {
  //Preparar llamada api
  let options = {
    mode: "cors" as RequestMode,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(empleado),
  };
  //Manejo de errores
  if(token != null ) {
    try {
      let response = await fetch(
        `https://traza-final.onrender.com/empleado/${empleado.id}`,
        options
      );
      if (response.ok) {
        alert("Empleado editado correctamente");
      } else {
        alert("Error HTTP: " + response.status);
      }
    } catch {
      alert("Error CORS, Revisa la URL o el back esta mal configurado");
    }
  } else {
    alert("Acceso no autorizado");
  }
 
}

export async function bajaEmpleado(empleado: Empleado, token: string | null) {
  //Preparar llamada api
  empleado.eliminado = true;
  empleado.fechaBaja = new Date().toJSON().slice(0, 10);
  let options = {
    mode: "cors" as RequestMode,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(empleado),
  };
  //Manejo de errores
  if(token != null) {
    try {
      let response = await fetch(
        `https://traza-final.onrender.com/empleado/${empleado.id}`,
        options
      );
      if (response.ok) {
        alert("Empleado dado de baja correctamente");
      } else {
        alert("Error HTTP: " + response.status);
      }
    } catch {
      alert("Error CORS, Revisa la URL o el back esta mal configurado");
    }
  } else {
    alert("Accion denegada")
  }
 
}
