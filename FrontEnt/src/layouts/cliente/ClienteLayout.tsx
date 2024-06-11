import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import MenuOpcionesUsuario from "./MenuOpcionesUsuario";
import { ReactNode } from "react";
import { ShoppingCart } from "@mui/icons-material";

interface ClienteLayoutTypes {
  children: ReactNode;
}

export default function ClienteLayout({ children }: ClienteLayoutTypes) {
  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Box
            component="img"
            src="/imgs/Icono.svg"
            sx={{ width: 80, margin: 1 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            El Buen Sabor
          </Typography>
          <Button variant="text" size="small" sx={{ color: "whitesmoke" }} color="primary">
            <ShoppingCart />
          </Button>
          <MenuOpcionesUsuario />
        </Toolbar>
      </AppBar>
      <Box component="main">
        <Container>{children}</Container>
      </Box>
    </Box>
  );
}
