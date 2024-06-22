import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";
import { localData } from '../servicios/vistaInicio/FuncionesAPI';

interface DecodedToken {
  "https://my-app.example.com/roles"?: string[];
  [key: string]: any;
}

const PostLogin = () => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const navigate = useNavigate();
  const idSucursal = localData.getSucursal("sucursal").id;

  useEffect(() => {
    const processToken = async () => {
      if (isAuthenticated) {
        try {
          const tokenClaims = await getIdTokenClaims();
          const token = tokenClaims!.__raw;
          const decodedToken = jwtDecode<DecodedToken>(token);
          const roles = decodedToken["https://my-app.example.com/roles"];
          console.log(decodedToken);
          if (roles) {
            localData.setRol("userRoles", roles);

            // Verificar y redirigir según el primer rol encontrado
            if (roles.includes("COCINERO")) {
              navigate("/dashboard/pedidos");
            } else if (roles.includes("ADMIN")) {
              navigate("/dashboard");
            } else if (roles.includes("CAJERO")) {
              navigate("/dashboard/pedidos");
            } else if (roles.includes("DELIVERY")) {
              navigate("/dashboard/pedidos");
            } else {
              localStorage.setItem("userRoles", "CLIENTE");
              navigate(`/cliente/sucursal/${idSucursal}`);
            }
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        localStorage.setItem("userRoles", "");
      }
    };

    processToken();
  }, [isAuthenticated, getIdTokenClaims, navigate]);

  return null;
};

export default PostLogin;
