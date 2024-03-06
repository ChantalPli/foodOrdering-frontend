import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom"


export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth0()

    if (isLoading) {
        return null
    }

    if (isAuthenticated) {
        return <Outlet />
    }

    return <Navigate to="/" replace />

    // return isAuthenticated ? (<Outlet />) : (<Navigate to="/" replace />)
    // replace indicates that we this to be a new url
    //Outlet: children of the route that has ProtectedRoute as element


}
