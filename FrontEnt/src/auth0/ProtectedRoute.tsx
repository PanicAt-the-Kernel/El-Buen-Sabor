import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, roles, allowedRoles, children }) => {
  const hasAccess = allowedRoles.some(role => roles.includes(role));

  if (!isAuthenticated || !hasAccess) {
    return <Navigate to="/cliente/bienvenida" />; // Redirige a la página de bienvenida si no está autenticado o no tiene el rol permitido
  }
  return children;
};


export default ProtectedRoute;