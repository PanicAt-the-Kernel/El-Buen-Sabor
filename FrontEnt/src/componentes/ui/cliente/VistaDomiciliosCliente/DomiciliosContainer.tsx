import { Box, Stack } from "@mui/material";
import DomicilioAcordeon from "./DomicilioAcordeon";

export default function DomicilioContainer(){
    return(
        <Box component="div" sx={{marginTop:2}}>
            <Stack spacing={2}>
                <DomicilioAcordeon />
                <DomicilioAcordeon />
                <DomicilioAcordeon />
            </Stack>
        </Box>
    )
}