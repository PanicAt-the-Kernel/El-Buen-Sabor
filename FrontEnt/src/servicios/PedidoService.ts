import useSWR, { SWRResponse } from "swr";
import Pedido from "../entidades/Pedido";
import PreferenceMP from "../entidades/PreferenceMP";
import {localSession} from "./localSession.ts";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function getAllPedidos(): SWRResponse<Pedido[], any, any> {
  return useSWR<Pedido[]>("https://traza-ending.onrender.com/pedidos", fetcher);
}

export function getPedidosPorSucursal(id:number):SWRResponse<Pedido[],any,any>{
  return useSWR<Pedido[]>(`https://traza-ending.onrender.com/pedidos/sucursal/${id}`,fetcher);
}

export function getPedidosCliente(
  clienteEmail: string
): SWRResponse<Pedido[], any, any> {
  return useSWR<Pedido[]>(
    `https://traza-ending.onrender.com/pedidos/cliente?userName=${clienteEmail}`,
    fetcher
  );
}

export async function savePedido(
  pedido: Pedido,
  setTotalPedido: (total: number) => void,
  vaciarCarrrito: () => void,
  totalEnvio: number
) {
  try {
    const options = {
      mode: "cors" as RequestMode,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    };
    const response = await fetch(
      `https://traza-ending.onrender.com/pedidos?precioDelivery=${totalEnvio}`,
      options
    );
    if (response.ok) {
      vaciarCarrrito();
      setTotalPedido(0);
      let data: Pedido = await response.json();
      alert("Pedido cargado correctamente con codigo: " + data.id);
      return data.id as number;
    } else {
      alert("Error al cargar pedido: " + response.status);
    }
  } catch (error) {
    //@ts-ignore
    alert(`Error: ${error.message}`);
    return undefined;
  }
}

export async function actualizarEstadoPedido(id: number, estado: string) {
  
  // Preparar llamada API
  let options = {
    mode: "cors" as RequestMode,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(estado),
  };

  // Manejo de errores
  try {
    let response = await fetch(
      `https://traza-ending.onrender.com/pedidos/${id}`,
      options
    );
    if (response.ok) {
      if (estado === "FACTURADO") {
        sendFactura(id);
      }
      if(estado=="PAGO_REALIZADO" || estado=="PAGO_RECHAZADO"){
        console.log("Pedido actualizado correctamente.")
      }
      alert("Pedido actualizado correctamente.");
    } else {
      alert("Error al actualizar pedido: " + response.status);
    }
  } catch (error) {
    alert("Error CORS, Revisa la URL o el back está mal configurado.");
  }
}
export async function sendFactura(id: Number) {
  //Preparar llamada api
  let options = {
    mode: "cors" as RequestMode,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let response = await fetch(
      `https://traza-ending.onrender.com/pedidos/${id}?idEmpleado=1`,
      options
    );
    if (response.ok) {
      alert("Se envio correctamente el correo");
    } else {
      alert("Error al enviar el correo: " + response.status);
    }
  } catch {
    alert("Error CORS, Revisa la URL o el back esta mal configurado.");
  }
}

export async function llamarMercadoPago(idPedido: number) {
  let options = {
    mode: "cors" as RequestMode,
    method: "GET",
  };
  try {
    let response = await fetch(
      `https://traza-ending.onrender.com/pedidos/llamarMercadoPago/${idPedido}`,
      options
    );
    if (response.ok) {
      let data = await response.json();
      return data as PreferenceMP;
    } else {
      alert("Error al obtener el preferenceID " + "Error: " + response.status);
      return undefined;
    }
  } catch {
    alert("Error CORS, Revisa la URL o el back esta mal configurado.");
    return undefined;
  }
}

export async function verificarStockPromo(id: number, pedido: any) {
  let options = {
    mode: "cors" as RequestMode,
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(pedido),
  };
  try {
    let response = await fetch(
      `https://traza-ending.onrender.com/pedidos/stockPromo/${id}`,
      options
    );
    if (response.ok) {
      let data=await response.json();
      return data as boolean;
    } else {
      alert("Error HTTP");
      let data=await response.json();
      console.log(data);
      return false;
    }
  } catch(error) {
    alert("Error CORS, Revisa la URL o el back esta mal configurado.");
    console.log(error)
    return false;
  }
}

export async function verificarStockArticulo(id:number,pedido:Pedido){
  let options = {
    mode: "cors" as RequestMode,
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(pedido)
  }
  try{
    let response = await fetch(`https://traza-ending.onrender.com/pedidos/stockArticulo/${id}`,options);
    if(response.ok){
      let data = await response.json();
      return data as boolean;
    }else{
      alert("ERROR HTTP");
      let data=await response.json();
      console.log(data);
      return false;
    }
  }catch(error){
    alert("Error CORS, Revisa la URL o el back esta mal configurado.");
    console.log(error)
    return false;
  }
}
