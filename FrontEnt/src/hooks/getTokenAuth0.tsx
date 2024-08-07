import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export default function getTokenAuth0() {
  const { getAccessTokenSilently } = useAuth0();
  const [token,setToken]=useState<string|null>(null);

  useEffect(()=>{
    getToken();
  },[])

  const getToken = async () => {
    try {
      const authToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://Auth0Example.com",
        },
      });
      setToken(authToken)
    } catch (error) {
      setToken(null)
    }
  };

  return token;
}
