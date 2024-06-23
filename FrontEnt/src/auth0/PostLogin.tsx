import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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

  useEffect(() => {
    const processToken = async () => {
      if (isAuthenticated) {
        try {
          const tokenClaims = await getIdTokenClaims();
          const token = tokenClaims!.__raw;
          const decodedToken = jwtDecode<DecodedToken>(token);
          const roles = decodedToken["https://my-app.example.com/roles"];
      


          if (roles) {
            localData.setRol("userRoles", roles);
            // Verificar y redirigir según el primer rol encontrado
            if (roles.includes("COCINERO")) {
              return ( <Navigate to="/dashboard/pedidos" />)
            } else if (roles.includes("ADMIN")) {
              return ( <Navigate to="/dashboard" />)
            } else if (roles.includes("CAJERO")) {
              return ( <Navigate to="/dashboard/pedidos" />)
            } else if (roles.includes("DELIVERY")) {
              return ( <Navigate to="/dashboard/pedidos" />)
            } else {
              localStorage.setItem("userRoles", "CLIENTE");
              return ( <Navigate to="/dashboard/pedidos" />)
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
