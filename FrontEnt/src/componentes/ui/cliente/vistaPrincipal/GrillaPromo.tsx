import { Grid, Typography } from "@mui/material";
import Promocion from "../../../../entidades/Promocion";
import ItemGrillaPromo from "./ItemGrillaPromo";

interface GrillaProductosProps {
  promociones: Promocion[];
}

export default function GrillaProductos({ promociones }: GrillaProductosProps) {

  if (promociones.length === 0) {
    return <Typography>No hay promociones disponibles</Typography>;
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{ backgroundColor: "#f1f5df", padding: 4, height: 700, overflow: "hidden", overflowY: "scroll" }}
    >
      {promociones.map((item: Promocion,index:number) => (
        <Grid item xs={12} sm={12} md={3}>
          <ItemGrillaPromo
            key={index}
            item={item}
          />
        </Grid>
      ))}
    </Grid>
  );
}
