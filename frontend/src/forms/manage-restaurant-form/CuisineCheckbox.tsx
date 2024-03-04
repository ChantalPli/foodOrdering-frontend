import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormItem, FormLabel } from "@/components/ui/form"
import { ControllerRenderProps, FieldValues } from "react-hook-form"

type Props = {
  cuisine: string,
  field: ControllerRenderProps<FieldValues, "cuisines">
}

export default function CuisineCheckbox({ cuisine, field }: Props) {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisine)} //field.value is an array that has to contain one cuisine option in orderto be checked
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, cuisine]) //new array with the list of cuisines the user already selected + the new one just selected
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== cuisine)
              )
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  )
}
