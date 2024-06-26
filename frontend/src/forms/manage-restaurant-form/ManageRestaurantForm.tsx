import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import DetailsSection from "./DetailsSection"
import { Separator } from "@/components/ui/separator"
import CuisinesSection from "./CuisinesSection"
import MenuSection from "./MenuSection"
import ImageSection from "./ImageSection"
import LoadingButton from "@/components/LoadingButton"
import { Button } from "@/components/ui/button"
import { Restaurant } from "@/types"
import { useEffect } from "react"

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "Restaurant name is required"
  }),
  city: z.string({
    required_error: "City name is required"
  }),
  country: z.string({
    required_error: "Country name is required"
  }),
  deliveryPrice: z.coerce.number({//it converts the string value into a num 
    required_error: "Delivery price is required",
    invalid_type_error: "must be a valid number"
  }),
  estimatedDeliveryTime: z.coerce.number({//it converts the string value into a num 
    required_error: "Estimated delivery time is required",
    invalid_type_error: "must be a valid number"
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "Please select at least one item"
  }),
  menuItems: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    price: z.coerce.number().min(1, "Price is required")
  })),
  imageUrl: z.string().optional(),
  imageFile: z.instanceof(File, { message: "Image is required" }).optional()
}).refine((data) => data.imageUrl || data.imageFile, { //data=formSchema
  message: "Either image Url or image File must be provided",
  path: ["imageFile"]
})

type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
  restaurant?: Restaurant // "?"" => the restaurant could be undefined in case the user hasn't created a restaurant yet
  onSave: (restaurantFormData: FormData) => void
  isLoading: boolean
}

export default function ManageRestaurantForm({ onSave, isLoading, restaurant }: Props) {

  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: '', price: 0 }]
    }
  })

  //to pre populate the form with the values from the restaurant object
  useEffect(() => {
    if (!restaurant) {
      return
    }
    //price lowest denomination of 100 = 100pence == 1GBP
    const deliveryPriceFormatted = parseInt((restaurant.deliveryPrice / 100).toFixed(2))
    const menuItemsFormatted = restaurant.menuItems.map((item) => ({  //we iterate over the array "menuItems" and we change the format of the price of the menuItem into the most common denomination
      ...item,
      price: parseInt((item.price / 100).toFixed(2)) //we overwrite the price property 
    }))

    //we update the restaurant object with the new prices:
    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted
    }

    form.reset(updatedRestaurant)

  }, [form, restaurant])




  const onSubmit = (formDataJson: RestaurantFormData) => {
    //convert formDataJson to a new FormData object
    const formData = new FormData() //bc we need the multipart/form-data

    formData.append("restaurantName", formDataJson.restaurantName)
    formData.append("city", formDataJson.city)
    formData.append("country", formDataJson.country)

    //ex: 1GBP = 100pence =>lowest denomination
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    ) //to convert the price to the lowest currency denomination 
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    )
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine)
    })
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name)
      formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString())
    })

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile)
    }

    onSave(formData)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator className="bg-yellow-600" />
        <CuisinesSection />
        <Separator className="bg-yellow-600" />
        <MenuSection />
        <Separator className="bg-yellow-600" />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button className="bg-green-800" type="submit">Submit</Button>}
      </form>

    </Form>
  )
}

