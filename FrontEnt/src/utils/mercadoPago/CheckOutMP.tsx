import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect } from "react";
import { localSession } from "../../servicios/localSession";

interface CheckOutMPTypes {
  preferenceID: string;
}

export default function CheckOutMP({ preferenceID }: CheckOutMPTypes) {
  useEffect(() => {
    initMercadoPago("APP_USR-dde2f690-4c16-44fb-b305-da3c9e4c1593", {
      locale: "es-AR",
    });
  }, []);

  console.log(preferenceID);
  return (
    <div
      id="wallet_container"
      onClick={() =>
        setTimeout(function () {
          window.location.replace(
            `/cliente/sucursal/${localSession.getSucursal("sucursal").id}`
          );
        }, 3000)
      }
    >
      <Wallet
        initialization={{
          preferenceId: preferenceID,
          redirectMode: "blank",
        }}
        customization={{ texts: { valueProp: "smart_option" } }}
      />
    </div>
  );
}
