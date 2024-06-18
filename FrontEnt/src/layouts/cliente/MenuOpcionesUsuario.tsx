import { Avatar, Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Usuario from "../../entidades/Usuario";

export default function MenuOpcionesUsuario() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [usuario, setUsuario] = useState<Usuario | null>(
    //localData.get("usuario")
  );

  const cerrarSesion = () => {
    alert("Sesión cerrada correctamente.");
    setUsuario(null);
    //localData.remove("usuario");
    window.location.reload();
  };

  return (
    <Box component="div">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar src="#">U</Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem sx={{ justifyContent: 'center', alignItems: 'center', pointerEvents: 'none', }} disabled>
          {usuario ? usuario?.userName : "Usuario"}
        </MenuItem>
        <MenuItem onClick={() => navigate('/cliente/cuenta')}>Mi perfil</MenuItem>
        <MenuItem onClick={() => navigate('/cliente/pedidos')}>Mis Pedidos</MenuItem>
        <MenuItem onClick={() => cerrarSesion()}>Cerrar Sesion</MenuItem>
      </Menu>
    </Box>
  );
}
