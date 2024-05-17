import { Grid, Paper } from "@mui/material";

function GraficosHolder(){
    return(
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper elevation={5}>
              <img src={"/imgs/grafico1.png"} className="img-fluid" />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={5}>
              <img src={"/imgs/grafico2.png"} className="img-fluid" />
            </Paper>
          </Grid>
        </Grid>
    )
}
export default GraficosHolder;
