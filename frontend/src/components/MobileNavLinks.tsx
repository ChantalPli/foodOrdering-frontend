import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"

function MobileNavLinks() {
  const { logout } = useAuth0()

  return (
    <>
      <Link
        to={"/order-status"}
        className="flex bg-white items-center font-bold text-green-900"
      >
        Order Status
      </Link>

      <Link
        to={"/manage-restaurant"}
        className="flex bg-white items-center font-bold text-green-900"
      >
        My Restaurant
      </Link>

      <Link
        to={"/user-profile"}
        className="flex bg-white items-center font-bold text-green-900"
      >
        User Profile
      </Link>
      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-stone-500">Log Out</Button>
    </>
  )
}

export default MobileNavLinks
