//api requests to communicate with the api/my/restaurant endpoint

import { Order, Restaurant } from "@/types"
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

  //this fetch req is passed to the useMutation hook(comes from reactQuery package)that will manage it
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

export function useUpdateMyRestaurant() {
  const { getAccessTokenSilently } = useAuth0()

  const updateRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData
    })
    if (!response.ok) {
      throw new Error("Failed to update restaurant")
    }
    return response.json()
  }
  const { mutate: updateRestaurant, isLoading, isSuccess, error } = useMutation(updateRestaurantRequest)

  if (isSuccess) {
    toast.success("Restaurant updated")
  }

  if (error) {
    toast.error("Unable to update restaurant")
  }

  return { updateRestaurant, isLoading }

}

export function useGetMyRestaurantOrders() {
  const { getAccessTokenSilently } = useAuth0()

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      throw new Error("Failed to fetch orders")
    }
    return response.json()
  }

  const { data: orders, isLoading } = useQuery(
    "fetchMyrestaurantOrders",
    getMyRestaurantOrdersRequest
  )
  return { orders, isLoading }
}

type UpdateOrderStatusRequest = {
  orderId: string,
  status: string
}

export function useUpdateMyRestaurantOrder() {
  const { getAccessTokenSilently } = useAuth0()

  const updateMyRestaurantOrder = async (updateStatusOrderRequest: UpdateOrderStatusRequest) => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: updateStatusOrderRequest.status })
    })

    return response.json()
  }

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset
  } = useMutation(updateMyRestaurantOrder)

  if (isSuccess) {
    toast.success("Order updated")
  }

  if (isError) {
    toast.error("Unable to update order")
    reset()
  }

  return { updateRestaurantStatus, isLoading }
}

