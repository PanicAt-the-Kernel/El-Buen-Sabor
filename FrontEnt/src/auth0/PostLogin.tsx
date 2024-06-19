import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  "https://api-buen-sabor.com/roles"?: string[];
  [key: string]: any;
}

const PostLogin = () => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

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
          } else {
            localStorage.setItem("userRoles", "CLIENTE");
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        localStorage.setItem("userRoles", "");
      }
    };

    processToken();
  }, [isAuthenticated, getIdTokenClaims]);

  return null;
};

export default PostLogin;
