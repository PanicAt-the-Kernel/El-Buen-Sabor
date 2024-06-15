import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

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
                    <p>Email: {user.rol}</p>
                </div>
            )}
        </div>
    );
};