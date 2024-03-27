// import hero from '../assets/hero_04.jpeg'
import hero from '../assets/food_ord.webp'


function Hero() {
  return (
    <div className='relative'>
      <img src={hero} className='w-full max-h-[600px] object-cover' />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-76">
        <div className="hidden md:block">
          <h1 className="text-base sm:text-5xl md:text-5xl sm:font-bold sm:tracking-tight sm:text-green-100 text-center">Discover a world of culinary convenience</h1>
        </div>
        {/* <span className="text-xl text-red-600">Food happiness is just a tap away!</span> */}
      </div>
      {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-76">
        <h1 className="text-5xl font-bold tracking-tight text-red-600 ">Discover a world of culinary convenience</h1>
       <span className="text-xl text-red-600">Food happiness is just a tap away!</span>
      </div> */}

    </div>
  )
}

export default Hero
