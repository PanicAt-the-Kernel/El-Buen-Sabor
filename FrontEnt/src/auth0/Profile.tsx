import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const Profile = () => {
    const { user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
    const navigate = useNavigate();
    const [roles, setRoles] = useState<string[] | null>(null);

    useEffect(() => {
        const fetchRoles = async () => {
            if (isAuthenticated) {
                navigate("/dashboard");

                try {
                    const tokenClaims = await getIdTokenClaims();
                    //@ts-ignore
                    const token = tokenClaims.__raw;
                    const config = {
                        headers: { Authorization: `Bearer ${token}` }
                    };
                    const response = await axios.get('http://localhost:5173/**', config);
                    setRoles(response.data.roles);
                    console.log("Esto es un response: ", response)
                } catch (error) {
                    console.error("Error fetching roles:", error);
                }
            }
        };

        fetchRoles();
    }, [isAuthenticated, navigate, getIdTokenClaims]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            {!isAuthenticated && <div>No estás autenticado.</div>}
            {isAuthenticated && user && (
                <div>
                    <h2>Perfil</h2>
                    <p>Nombre: {user.name}</p>
                    <p>Email: {user.email}</p>
                    {roles && (
                        <div>
                            <h3>Roles:</h3>
                            <pre>{JSON.stringify(roles, null, 2)}</pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};