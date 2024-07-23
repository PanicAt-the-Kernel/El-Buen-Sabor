import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect } from "react";

interface CheckOutMPTypes {
  preferenceID: string;
}

export default function CheckOutMP({ preferenceID }: CheckOutMPTypes) {
  useEffect(() => {
    initMercadoPago("APP_USR-dde2f690-4c16-44fb-b305-da3c9e4c1593", {
      locale: "es-AR",
    });
  }, []);
  return (
    <div
      id="wallet_container"
    >
      <Wallet
        initialization={{
          preferenceId: preferenceID,
          redirectMode: "self",
        }}
        customization={{ texts: { valueProp: "smart_option" } }}
      />
    </div>
  );
}
