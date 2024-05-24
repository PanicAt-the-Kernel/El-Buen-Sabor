import { Edit } from "@mui/icons-material"
import { Button } from "@mui/material"

export default function BotonEditarGenerico(){
    return(
        <Button size="small" variant="contained" startIcon={<Edit />}>Editar</Button>
    )
}