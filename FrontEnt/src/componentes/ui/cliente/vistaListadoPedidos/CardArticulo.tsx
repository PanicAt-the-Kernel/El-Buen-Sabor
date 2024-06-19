import { Card, CardMedia, CardContent, Typography} from "@mui/material";

export default function CardArticulo(){
    return(
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="https://placehold.co/600x400"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            Nombre Producto
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Cantidad Comprada: 2 unidades
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center"> Precio Unitario $1234</Typography>
        </CardContent>
      </Card> 
    )
}