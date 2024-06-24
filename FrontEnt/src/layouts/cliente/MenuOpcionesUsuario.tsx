import { Avatar, Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Usuario from "../../entidades/Usuario";
import { localData } from "../../servicios/vistaInicio/FuncionesAPI";
import { useAuth0 } from "@auth0/auth0-react";

export default function MenuOpcionesUsuario() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { user } = useAuth0();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [usuario, setUsuario] = useState<Usuario | null>(
    localData.getUsuario('usuario')
  );

  const cerrarSesion = () => {
    const { logout } = useAuth0();
    logout({ logoutParams: { returnTo: window.location.pathname } });
    localStorage.removeItem("userRoles");
    alert("Sesión cerrada correctamente.");
    setUsuario(null);
    localData.removeUsuario('usuario');
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
          {user ? user?.email : "Usuario"}
        </MenuItem>
        <MenuItem onClick={() => navigate('/cliente/cuenta')}>Datos</MenuItem>
        <MenuItem onClick={() => navigate('/cliente/domicilios')}>Domicilios</MenuItem>
        <MenuItem onClick={() => navigate('/cliente/pedidos')}>Pedidos</MenuItem>
        <MenuItem onClick={() => cerrarSesion()}>Cerrar Sesion</MenuItem>
      </Menu>
    </Box>
  );
}
