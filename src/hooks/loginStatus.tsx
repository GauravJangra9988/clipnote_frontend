import Cookies from "js-cookie"
import { Navigate } from "react-router-dom";

function isAuthenticated(){
    return Boolean(Cookies.get("token"));
}

export default function PrivateRoute({children} : {children: JSX.Element}){
    return isAuthenticated() ? children : <Navigate to="/auth" replace/>
}