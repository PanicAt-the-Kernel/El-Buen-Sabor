import { Box, Stack } from "@mui/material";
import DomicilioAcordeon from "./DomicilioAcordeon";
import { getAllDomicilios } from "../../../../servicios/vistaInicio/FuncionesAPI";
import Domicilio from "../../../../entidades/Domicilio";

export default function DomicilioContainer() {
    const { data: domicilios } = getAllDomicilios();
    return (
        <Box component="div" sx={{ marginTop: 2 }}>
            <Stack spacing={2}>
                {domicilios?.sort((a, b) => b.id - a.id)
                    .map((item: Domicilio) => (
                        <>
                            <DomicilioAcordeon iDomicilio={item} />
                        </>
                    ))}
            </Stack>
        </Box>
    )
}