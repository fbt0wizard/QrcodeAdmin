import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"


const useAuth = () => {
    const { products } = useSelector((state) => state.data);

    const empty = Object.keys(products).length === 0;

    const result = {data: !empty }
    return result && result.data
}


const ProtectManageProduct = () => {
    const isGood =  useAuth()

    return isGood ? <Outlet /> : <Navigate to="/products" />
}

export default ProtectManageProduct

