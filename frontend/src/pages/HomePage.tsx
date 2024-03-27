import landingImage from "../assets/mobile1.webp"
import appDownloadImg from "../assets/buttons_mobile.jpeg"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import { useNavigate } from "react-router-dom"
import foodOrdering from "../assets/ord-food.jpeg"
import customiseOrder from "../assets/foodDelivery.webp"
import food_tracking from "../assets/food_tracking.jpeg"
// import { AspectRatio } from "@/components/ui/aspect-ratio"



function HomePage() {
  const navigate = useNavigate(

  )
  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`, //it takes the user to the searchPage and adds their searchQuery as parameter
    })
  }

  return (
    <div className="flex flex-col gap-12">

      <div className="md:px-32 shadow-sm rounded-sm py-10 flex flex-col gap-5 text-center -mt-6" >
        <span className="text-xl text-green-800 font-semibold tracking-wider">Your favorite restaurants,delivered</span>
        <SearchBar
          placeHolder="Search by city"
          onSubmit={handleSearchSubmit}
        />
      </div>

      {/* //extra col */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="flex flex-col items-center justify-center gap-4 text-center border border-yellow-500 border-l-4 rounded">
          <span className="font-bold text-1xl tracking-wider mt-2">Free delivery on your first order</span>
          <img src={foodOrdering} style={{ width: '100%', height: "100%" }} />
        </div>

        <div className="flex flex-col justify-center gap-4 text-center border border-green-900 border-l-4 rounded">
          <span className="font-bold text-1xl tracking-wider mt-2">Customise your order</span>
          <img src={customiseOrder} style={{ width: '100%', height: '100%' }} />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 text-center border border-yellow-500 0 border-l-4 rounded">
          <span className="font-bold text-1xl tracking-wider mt-2">Real-time tracking</span>
          {/* <span>Download the app</span> */}
          <img src={food_tracking} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">Improve your ordering experience!</span>
          <span>Download the app</span>
          <img src={appDownloadImg} />
        </div>
      </div>

    </div>
  )
}

export default HomePage


{/* <div className="flex flex-col gap-12">

<div className="md:px-32 bg-stone-50 rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-10">
  <h1 className="text-5xl font-bold tracking-tight text-orange-600">Discover a world of culinary convenience</h1>
  <span className="text-xl  text-orange-600">Food happiness is just a tap away!</span>
  <SearchBar
    placeHolder="Search by city"
    onSubmit={handleSearchSubmit}
  />
</div>

<div className="grid md:grid-cols-2 gap-5">
  <img src={landingImage} />
  <div className="flex flex-col items-center justify-center gap-4 text-center">
    <span className="font-bold text-3xl tracking-tighter">Improve your ordering experience!</span>
    <span>Download the app</span>
    <img src={appDownloadImg} />
  </div>
</div>
</div>
) */}