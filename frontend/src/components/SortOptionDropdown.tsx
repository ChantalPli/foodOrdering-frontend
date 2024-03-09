import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

type Props = {
  sortOption: string //what the current value is in the dropdown 
  onChange: (value: string) => void
}

const SORT_OPTION = [
  {
    label: "Best Match",
    value: "bestMatch"
  },
  {
    label: "Delivery price",
    value: "deliveryPrice"
  },
  {
    label: "Estimated delivery time ",
    value: "estimatedDeliveryTime"
  }
]


export default function SortOptionDropdown({ onChange, sortOption }: Props) {

  //to get the label based on the value:
  const selectedSortLabel = SORT_OPTION.find((option) => option.value === sortOption)?.label || SORT_OPTION[0].label


  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button className="w-full" variant="outline">
          Sort by : {selectedSortLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTION.map((option, index) => (
          <DropdownMenuItem
            key={index}
            className="cursor-pointer"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
