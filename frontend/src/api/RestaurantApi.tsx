import { SearchState } from "@/pages/SearchPage"
import { RestaurantSearchResponse } from "@/types"
import { useQuery } from "react-query"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export function useSearchRestaurant(searchState: SearchState, city?: string) {

    const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
        const params = new URLSearchParams()
        params.set("searchQuery", searchState.searchQuery)
        params.set("page", searchState.page.toString())
        params.set("selectedCuisines", searchState.selectedCuisines.join(","))
        params.set("sortOption", searchState.sortOption)

        const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`)

        if (!response.ok) {
            throw new Error("Failed to get restaurant")
        }
        return response.json()
    }
    //any time the searchState object changes, the query runs again 
    const { data: results, isLoading } = useQuery(
        ["searchRestaurants", searchState],
        createSearchRequest,
        { enabled: !!city }//the query in going to run only if city is a truthy value 
    )

    return { results, isLoading }
} 