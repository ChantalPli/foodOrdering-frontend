import { useGetRestaurant } from "@/api/RestaurantApi"
import CheckoutButton from "@/components/CheckoutButton"
import MenuItemComponent from "@/components/MenuItem"
import OrderSummary from "@/components/OrderSummary"
import RestaurantInfo from "@/components/RestaurantInfo"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardFooter } from "@/components/ui/card"
import { MenuItem as MenuItemType } from "@/types"
import { useState } from "react"
import { useParams } from "react-router-dom"

export type CartItem = {
  _id: string,
  name: string,
  price: number,
  quantity: number
}

export default function DetailPage() {
  const { restaurantId } = useParams()
  const { restaurant, isLoading } = useGetRestaurant(restaurantId)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`)
    return storedCartItems ? JSON.parse(storedCartItems) : []
  })

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItem) => {
      //1.check if the item is already in the cart:
      const existingCartItem = prevCartItem.find((cartItem => cartItem._id === menuItem._id))

      let updateCartItems;

      //2. if it is,add the quantity
      if (existingCartItem) {
        updateCartItems = prevCartItem.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            :
            cartItem
        )
        //3. if it's not, add it as a new item
      } else {
        updateCartItems = [
          ...prevCartItem, {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1
          }
        ]
      }
      //to save the cartItems:
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updateCartItems)
      )

      return updateCartItems
    })
  }

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      )

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      )

      return updatedCartItems
    })
  }



  if (isLoading || !restaurant) {
    return "Loading..."
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full" />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className=" flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight ">Menu</span>
          {restaurant.menuItems.map((menuItem, index) => (
            <MenuItemComponent
              key={index}
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton />
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  )
}
