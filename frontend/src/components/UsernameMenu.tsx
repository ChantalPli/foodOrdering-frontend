import { UserIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"


function UsernameMenu() {
  const { user, logout } = useAuth0()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold text-white hover:text-white gap-2 hover:bg-orange-700 bg-green-800 p-3 border-2 rounded-lg">
        <UserIcon className="text-white" />
        {user?.email}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to={"/manage-restaurant"}
            className="font-bold hover:text-orange-600"
          >
            Manage my Restaurant
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link
            to={"/user-profile"}
            className="font-bold hover:text-orange-600"
          >
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold bg-green-800">
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UsernameMenu
