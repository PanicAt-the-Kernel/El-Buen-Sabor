import { Grid } from "@mui/material";
import ItemGrilla from "./ItemGrilla";

export default function GrillaProductos(){
    return(
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3}>
                <ItemGrilla/>
            </Grid>
        </Grid>
    )
}