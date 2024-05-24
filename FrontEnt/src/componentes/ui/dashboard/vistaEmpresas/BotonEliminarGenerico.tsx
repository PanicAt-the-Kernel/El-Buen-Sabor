import { DeleteForever } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function BotonEliminarGenerico(){
    return(
        <Button size="small" variant="contained" color="error" startIcon={<DeleteForever />}>Borrar</Button>
    )
}