import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

type Props = {
  index: number,
  removeMenuItem: () => void
}


export default function MenuItemInput({ index, removeMenuItem }: Props) {
  const { control } = useFormContext() //to link the form field from the name and price to the form

  return (
    <div className="flex flex-row items-end gap-2">

      {/* NAME */}
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="coconut curry"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* PRICE */}
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price(£) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="19.00"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <Button type="button" onClick={removeMenuItem} className="bg-red-500 max-h-fit">
        Remove
      </Button>
    </div>
  )
}

