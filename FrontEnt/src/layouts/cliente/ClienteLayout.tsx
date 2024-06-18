import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Stack,
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
          <Box component="div" sx={{ flexGrow: 1 }}>
            <Stack>
              <Typography variant="body1">El Buen Sabor</Typography>
              <Typography variant="body2">Nombre Sucursal</Typography>
            </Stack>
          </Box>
          <Button
            variant="text"
            size="small"
            sx={{ color: "whitesmoke" }}
            color="primary"
          >
            <ShoppingCart />
          </Button>
          <MenuOpcionesUsuario />
        </Toolbar>
      </AppBar>
      <Box component="main">
        {children}
      </Box>
    </Box>
  );
}
