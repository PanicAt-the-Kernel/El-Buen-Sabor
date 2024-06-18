import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";


// Define la interfaz para el token decodificado
interface DecodedToken extends JwtPayload {
    name?: string; // Ejemplo: si esperas que el token tenga un campo 'name'
    email?: string; // Ejemplo: si esperas que el token tenga un campo 'email'
    [key: string]: any; // Incluir cualquier otra propiedad adicional que esperes en el token
}

export const Profile = () => {
    const { user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
    const navigate = useNavigate();
    const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

    useEffect(() => {
        const decodeToken = async () => {
            if (isAuthenticated) {
                navigate("/dashboard");

                try {
                    const tokenClaims = await getIdTokenClaims();
                    //@ts-ignore
                    const token = tokenClaims.__raw; // Obtén el token en formato string
                    const decoded = jwtDecode<DecodedToken>(token); // Decodifica el token
                    setDecodedToken(decoded); // Guarda el token decodificado en el estado
                    console.log("Esto es el token decoded: ", decoded)
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            }
        };

        decodeToken();
    }, [isAuthenticated, navigate, getIdTokenClaims]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    const roles = decodedToken?.["https://buen-sabor.com/roles"]?.join(", ") || "";

    return (
        <div>
            {!isAuthenticated && <div>No estás autenticado.</div>}
            {isAuthenticated && !roles && user && (
                <div>
                    <h2>Perfil</h2>
                    <p><b>Nombre: </b> {user.nickname}</p>
                    <p><b>Email: </b> {user.email}</p>
                    <p><b>Roles: </b>Sin roles asignados.</p>
                </div>
            )}
            {isAuthenticated && roles && user && (
                <div>
                    <h2>Perfil</h2>
                    <p><b>Nombre: </b> {user.nickname}</p>
                    <p><b>Email: </b> {user.email}</p>
                    <p><b>Roles: </b> {roles}</p>
                </div>
            )}
        </div>
    );
};
