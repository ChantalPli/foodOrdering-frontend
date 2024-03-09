import { useSearchRestaurant } from "@/api/RestaurantApi"
import PaginationSelector from "@/components/PaginationSelector"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import SearchResultCard from "@/components/SearchResultCard"
import SearchResultInfo from "@/components/SearchResultInfo"
import { useState } from "react"
import { useParams } from "react-router-dom"

export type SearchState = {
  searchQuery: string,
  page: number
}

export default function SearchPage() {
  const { city } = useParams()
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1
  })
  const { results, isLoading } = useSearchRestaurant(searchState, city) //it contains the data object

  //func to update the state(the page value):
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page
    }))
  }

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1
    }))
  }

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1
    }))
  }

  if (isLoading) {
    <span>Loading...</span>
  }

  if (!results?.data || !city) {
    return <span>No results found</span>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        insert cuisines here!!!
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by cuisine or restaurant name"
          onReset={resetSearch}
        />
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant, index) => (
          <SearchResultCard restaurant={restaurant} key={index} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
