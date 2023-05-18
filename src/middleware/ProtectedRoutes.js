//controlla che siamo loggati 
//se abbiamo questo login ci farà andare avanti

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"

const useAuth = () => {
    const session = JSON.parse(localStorage.getItem("loggedIn"));
    if (session && session.email && session.email.length > 0) {
        return true;
    }
    return false;
};

const ProtectedRoutes = () => {
    const isAuthorized = useAuth()
    const navigate = useNavigate()
    useEffect(()=>{
        if (!isAuthorized){
            navigate("/", {replace: true})
        }    
    },[navigate])
    
    return <Outlet/> 
    /* 
    if (isAuthorized) {
        return <Outlet/>;
    } else {
        return navigate;
    }
    */
}


export default ProtectedRoutes