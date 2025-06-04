import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { user, loading, logOut } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && !isAdmin) {
        logOut();
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user && isAdmin) {
        return children
    }
    return <Navigate to={'/login'} state={{ from: location }} replace />
};

export default AdminRoute;