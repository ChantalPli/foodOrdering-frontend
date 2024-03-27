import { Restaurant } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Utensils } from "lucide-react"

type Props = {
  restaurant: Restaurant
}

export default function RestaurantInfo({ restaurant }: Props) {
  return (
    <Card className="borderd-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurant.country}, {restaurant.city}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurant.cuisines.map((item, index) => (
          <span className="flex p-2" key={index}>
            <span>{item}</span>
            {/* we display the dot only if it's not the last item */}
            {<Utensils size={18} />}
          </span>
        ))}
      </CardContent>
    </Card>
  )
}
