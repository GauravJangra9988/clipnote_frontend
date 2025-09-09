import Cookies from "js-cookie"
import { Navigate } from "react-router-dom";

function isAuthenticated(){
    return Boolean(Cookies.get("token"));
}

export function PrivateRoute({children} : {children: JSX.Element}){
    return isAuthenticated() ? <Navigate to="/home" replace/> : children
}

export function PrivateRouteHome({children} : {children: JSX.Element}){
    return isAuthenticated() ? children : <Navigate to="/" replace/>
}