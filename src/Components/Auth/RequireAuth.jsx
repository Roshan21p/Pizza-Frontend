import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


function RequireAuth(){
     const { isLoggedIn, } = useSelector((state) => state.auth); 
     console.log("Role", isLoggedIn, {role});
     return isLoggedIn ?  <Outlet /> : <Navigate to="/auth/login" />;

}

export default RequireAuth;