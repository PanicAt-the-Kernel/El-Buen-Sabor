import { Wallet, initMercadoPago } from "@mercadopago/sdk-react"
import { Box } from "@mui/material"
import { useEffect } from "react"

export default function CheckOutMP(){
    useEffect(()=>{
        initMercadoPago("",{locale:"es-AR"})
    },[])
    
    return(
        <Box component="div">
            <Wallet initialization={{preferenceId:"APP_USR-dde2f690-4c16-44fb-b305-da3c9e4c1593"}} />
        </Box>
    )
}