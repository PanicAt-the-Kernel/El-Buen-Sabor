import { Add, Info, Remove, ShoppingCart } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  Badge,
} from "@mui/material";

export default function ItemGrilla() {
  return (
    <Card sx={{ maxWidth: 330 }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent sx={{justifyContent:"center"}}>
        <Typography gutterBottom variant="h5" component="div">
          Nombre Producto
        </Typography>
        <Typography variant="body2" color="text.secondary">
          $Precio
        </Typography>
      </CardContent>
      <CardActions>
        <Stack spacing={2} alignItems={"center"}>
          <Button
            size="small"
            variant="contained"
            color="info"
            startIcon={<Info />}
          >
            Ingredientes
          </Button>
          <Stack direction={"row"}>
            <Button size="small" startIcon={<Remove />} />
            <Badge badgeContent={3} color="info">
              <ShoppingCart />
            </Badge>
            <Button size="small" startIcon={<Add />} />
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
}
