//hooks needed to communicate with the myuserapi endpoint

import { User } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

//#1_CUSTOM HOOK 
export function useGetMyUser() {
  const { getAccessTokenSilently } = useAuth0()

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      throw new Error("Failed to fetch user")
    }

    return response.json()
  }
  const {
    data: currentUser,
    isLoading,
    error
  } = useQuery("fetchCurrentUser", getMyUserRequest)

  if (error) {
    toast.error(error.toString())
  }

  return { currentUser, isLoading }
}

type CreateUserRequest = {
  auth0Id: string,
  email: string
}

//#2_CUSTOM HOOK  that makes the api request:
export function useCreateMyUser() {
  //func that let us fetch the token from the Auth0:
  const { getAccessTokenSilently } = useAuth0()

  //fetch req to the backend to create a user:
  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })

    if (!response.ok) {
      throw new Error("Failed to create user")
    }
  }
  //we pass this fetch req to the useMutation hook(comes from reactQuery package)that will manage it
  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess
  } = useMutation(createMyUserRequest)

  return { createUser, isLoading, isError, isSuccess }
}

type UpdateMyUserRequest = {
  name: string,
  addressLine1: string,
  city: string,
  country: string
}

//#3_CUSTOM HOOK
export function useUpdateMyUser() {
  const { getAccessTokenSilently } = useAuth0()

  //fetch request
  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    if (!response.ok) {
      throw new Error("Failed to update user")
    }
    return response.json()
  }

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset
  } = useMutation(updateMyUserRequest)

  if (isSuccess) {
    toast.success("User profile update!")
  }

  if (error) {
    toast.error(error.toString())
    reset()
  }

  return { updateUser, isLoading }
}


