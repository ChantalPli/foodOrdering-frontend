import landingImage from "../assets/mobile1.webp"
import appDownloadImg from "../assets/buttons_mobile.jpeg"


function HomePage() {

    return (
        <div className="flex flex-col gap-12">
            <div className="bg-stone-50 rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-orange-600">Discover a world of culinary convenience</h1>
                <span className="text-xl  text-orange-600">Food happiness is just a tap away!</span>
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
