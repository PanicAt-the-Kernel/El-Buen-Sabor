import { Grid } from "@mui/material";
import ItemGrilla from "./ItemGrilla";

export default function GrillaProductos() {
  return (
    <Grid
      container
      spacing={2}
      sx={{ backgroundColor: "#f1f5df", padding: 4, height: 700,overflow:"hidden",overflowY:"scroll"}}
    >
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <ItemGrilla />
      </Grid>
    </Grid>
  );
}
