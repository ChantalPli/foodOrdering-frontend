import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import UsernameMenu from "./UsernameMenu"
import { Link } from "react-router-dom"


function MainNav() {
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ?
        (
          <>
            <Link to="/order-status" className="font-bold hover:text-white hover:bg-orange-700  border-2 border-orange-700 p-3 rounded-lg">
              Order Status
            </Link>
            <UsernameMenu />
          </>

        ) : (
          <Button
            // variant="ghost"
            className="font-bold hover:text-orange-100 hover:bg-green-800 bg-red-700"
            onClick={async () => await loginWithRedirect()}
          >
            Log In
          </Button>)}
    </span>
  )
}

export default MainNav
