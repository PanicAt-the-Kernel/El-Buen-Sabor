import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  "https://api-buen-sabor.com/roles"?: string[];
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
          const roles = decodedToken["https://api-buen-sabor.com/roles"];

          if (roles) {
            localStorage.setItem("userRoles", JSON.stringify(roles));

            // Verificar y redirigir según el primer rol encontrado
            if (roles.includes("COCINERO")) {
              navigate("/dashboard/pedidos");
            } else if (roles.includes("ADMINISTRADOR")) {
              navigate("/dashboard");
            } else if (roles.includes("CAJERO")) {
              navigate("/dashboard/pedidos");
            } 
             else if (roles.includes("DELIVERY")) {
            navigate("/dashboard/pedidos");
            }else {
              localStorage.setItem("userRoles", "CLIENTE");
              navigate(window.location.pathname);
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
