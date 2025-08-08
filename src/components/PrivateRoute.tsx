import { type ReactElement, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface PrivateRouteProps {
    children: ReactElement;
}

export const PrivateRoute:React.FC<PrivateRouteProps> = ({children}) =>
{
    const {user} = useContext(AuthContext);
    return user ? children: <Navigate to = '/login' replace />;
}

