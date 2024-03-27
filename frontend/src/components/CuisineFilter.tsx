import { cuisineList } from "@/config/restaurant-options-config"
import { Label } from "./ui/label"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { ChangeEvent } from "react"
import { Button } from "./ui/button"

type Props = {
  onChange: (cuisines: string[]) => void
  selectedCuisines: string[]
  isExpanded: boolean
  onExpandedClick: () => void
}

export default function CuisineFilter({ onChange, selectedCuisines, isExpanded, onExpandedClick }: Props) {

  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value
    const isChecked = event.target.checked

    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine)  //new array without the clicked cuisine in it 

    onChange(newCuisinesList)
  }

  const handleCuisinesReset = () => onChange([])

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter by cuisine</div>
        <div onClick={handleCuisinesReset} className="font-semibold mb-2 underline cursor-pointer text-orange-600 text-sm ">Reset Filters</div>
      </div>

      <div className="flex flex-col space-y-2">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine, index) => {
            const isSelected = selectedCuisines.includes(cuisine)
            return (
              <div key={index} className="flex">
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${isSelected
                    ? "border border-green-700 text-green-700"
                    : "border border-slate-300"
                    }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>

              </div>)
          })}

        <Button
          variant="link"
          className="mt-4 flex-1"
          onClick={onExpandedClick}
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>

      </div>
    </>
  )
}
