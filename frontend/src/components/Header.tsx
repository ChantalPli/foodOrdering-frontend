import { Link } from "react-router-dom"
import MobileNav from "./MobileNav"
import MainNav from "./MainNav"
import logo from "../../public/assets/logo_eat.webp"
// import logo from "../assets/food_ord.webp"


function Header() {
  return (
    <div className="border-b-2 border-b-green-700 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
        >
          <img src={logo} className="w-[70px] rounded-lg" />
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  )
}
// function Header() {
//   return (
//     <div className="absolute top-0 left-0 w-full py-3 z-10">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link
//           to="/"
//         >
//           <img src={logo} className="w-[70px] sm:w-[70px] rounded-lg" />
//         </Link>
//         <div className="md:hidden">
//           <MobileNav />
//         </div>
//         <div className="hidden md:block">
//           <MainNav />
//         </div>
//       </div>
//     </div>
//   )
// }

export default Header
