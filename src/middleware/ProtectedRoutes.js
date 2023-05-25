//controlla che siamo loggati 
//se abbiamo questo login ci farà andare avanti

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import { Toast } from '../utilities/notifications';

const errorToast = new Toast("Login fallito");

const useAuth = () => {
    const session = JSON.parse(localStorage.getItem("loggedIn"));
    if (session) {
        return session;
    }
    return false;
};

const ProtectedRoutes = () => {
    const isAuthorized = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthorized) {
            setTimeout(() => {
                errorToast.error()
            }, 50)
            navigate("/", { replace: true })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate])

    return (
        <>
            <div>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
            <Outlet />
        </>
    )
    /* 
    if (isAuthorized) {
        return <Outlet/>;
    } else {
        return navigate;
    }
    */
}


export default ProtectedRoutes