import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

interface CardTypes {
  titulo: string;
  imgURL: string;
  descripcion: string;
  url: string;
}

function CardMUI({ titulo, imgURL, descripcion, url }: CardTypes) {
  return (
    <Link to={url} style={{textDecoration:'none'}}>
      <Card sx={{ maxWidth: 345,textAlign:"center" }}>
        <CardMedia sx={{ height: 200 }} image={imgURL} title={titulo} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {descripcion}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
export default CardMUI;
