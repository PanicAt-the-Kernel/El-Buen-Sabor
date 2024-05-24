import { Info } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function BotonInfoGenerico(){
    return(
        <Button size="small" variant="contained" color="info" startIcon={<Info />}>Info</Button>
    )
}