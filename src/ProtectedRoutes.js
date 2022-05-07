import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const useAuth = () => {
    const { isLoggedIn } = useSelector((state) => state.userData);

    const user = {loggedIn: isLoggedIn }
    return user && user.loggedIn
}


const ProtectedRoutes = () => {
    const isAuth = useAuth()

  return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes