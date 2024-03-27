import { Separator } from "@radix-ui/react-separator"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Menu, UserIcon } from 'lucide-react'
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import MobileNavLinks from "./MobileNavLinks"


function MobileNav() {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0()

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-orange-600" />
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                    {isAuthenticated ? (
                        <span className="flex items-center font-bold gap-2">
                            <UserIcon className="text-green-950" />
                            {user?.email}</span>
                    ) : (
                        <span>Welcome to EatOn!</span>
                    )}
                </SheetTitle>
                <Separator />
                <SheetDescription className="flex flex-col gap-4">
                    {isAuthenticated ? (
                        <MobileNavLinks />
                    ) : (
                        <Button
                            onClick={() => loginWithRedirect()}
                            className="flex-1 font-bold bg-orange-700">Log In</Button>
                    )}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav
