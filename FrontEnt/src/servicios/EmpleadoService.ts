import useSWR, { SWRResponse } from "swr";
import Empleado from "../entidades/Empleado";
import { localSession } from "./localSession";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function getAllEmpleados(): SWRResponse<Empleado[], any, any> {
  return useSWR<Empleado[]>(
    `https://traza-final.onrender.com/empleado`,
    fetcher
  );
}

export async function saveEmpleado(empleado: Empleado) {
  //Preparar llamada api
  empleado.sucursal = localSession.getSucursal("sucursal");
  const options = {
    mode: "cors" as RequestMode,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(empleado),
  };

  //Manejo de errores
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
}

export async function editEmpleado(empleado: Empleado) {
  //Preparar llamada api
  let options = {
    mode: "cors" as RequestMode,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(empleado),
  };
  //Manejo de errores
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
}

export async function bajaEmpleado(empleado: Empleado) {
  //Preparar llamada api
  empleado.eliminado = true;
  empleado.fechaBaja = new Date().toJSON().slice(0, 10);
  let options = {
    mode: "cors" as RequestMode,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(empleado),
  };
  //Manejo de errores
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
}
