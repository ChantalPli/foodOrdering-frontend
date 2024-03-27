import landingImage from "../assets/mobile1.webp"
import appDownloadImg from "../assets/buttons_mobile.jpeg"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import { useNavigate } from "react-router-dom"



function HomePage() {
    const navigate = useNavigate(

    )
    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`, //it takes the user to the searchPage and adds their searchQuery as parameter
        })
    }

    return (
        <div className="flex flex-col gap-36">

            <div className="md:px-32 rounded-lg py-8 flex flex-col gap-5 text-center -mt-10">
                <h1 className="text-5xl font-bold tracking-tight text-red-600 ">Discover a world of culinary convenience</h1>
                <span className="text-xl text-red-600">Food happiness is just a tap away!</span>
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