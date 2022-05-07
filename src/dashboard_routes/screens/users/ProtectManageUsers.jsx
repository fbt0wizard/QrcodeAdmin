import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"


const useAuth = () => {
    const { users } = useSelector((state) => state.data);

    const empty = Object.keys(users).length === 0;

    const result = {data: !empty }
    return result && result.data
}


const ProtectManageUsers = () => {
    const isGood =  useAuth()

    return isGood ? <Outlet /> : <Navigate to="/users" />
}

export default ProtectManageUsers

