//api requests to communicate with the api/my/restaurant endpoint

import { Restaurant } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export function useGetMyRestaurant() {
    const { getAccessTokenSilently } = useAuth0()

    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently()

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (!response.ok) {
            throw new Error("Failed to get restaurant")
        }

        return response.json()
    }
    const { data: restaurant, isLoading } = useQuery(
        "fetchingMyRestaurant", //name of the query
        getMyRestaurantRequest // req to manage
    )
    return { restaurant, isLoading }
}


export function useCreateMyRestaurant() {
    const { getAccessTokenSilently } = useAuth0()

    const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently()

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData
        })
        if (!response.ok) {
            throw new Error("Failed to create restaurant")
        }

        return response.json()
    }

    //we pass this fetch req to the useMutation hook(comes from reactQuery package)that will manage it
    const {
        mutate: createRestaurant,
        isLoading,
        isSuccess,
        error
    } = useMutation(createMyRestaurantRequest)

    if (isSuccess) {
        toast.success("Restaurant created!")
    }

    if (error) {
        toast.error("Unable to create restaurant")
    }

    return { createRestaurant, isLoading }
}

