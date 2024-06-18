import {  useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const RoleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener roles del almacenamiento local
    //@ts-ignore
    const userRoles = JSON.parse(localStorage.getItem("userRoles"));

    // Verificar y redirigir según el primer rol encontrado
    if (userRoles && userRoles.length > 0) {
      switch (userRoles[0]) {
        case "COCINERO":
          navigate("/dashboard/pedidos");
          break;
        case "ADMINISTRADOR":
          navigate("/dashboard");
          break;
        case "CAJERO":
          navigate("/dashboard/pedidos");
          break;
        case "CLIENTE":
          navigate(window.location.pathname);
          break;
        default:
          break;
      }
    }
  }); 

  return null; 
};

export default RoleRedirect;