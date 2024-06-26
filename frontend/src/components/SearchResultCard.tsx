import { Restaurant } from "@/types"
import { Link } from "react-router-dom"
import { AspectRatio } from "./ui/aspect-ratio"
import { Banknote, Clock, Utensils } from "lucide-react"

type Props = {
  restaurant: Restaurant
}

export default function SearchResultCard({ restaurant }: Props) {
  return (
    <Link
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
      to={`/detail/${restaurant._id}`}>
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md w-full h-full object-cover" />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((item, index) => (
              <span className="flex p-2" key={index}>
                <span>{item}</span>
                {<Utensils size={18} />}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-1 text-orange-600">
              <Clock className="text-orange-600" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Delivery from £{(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
