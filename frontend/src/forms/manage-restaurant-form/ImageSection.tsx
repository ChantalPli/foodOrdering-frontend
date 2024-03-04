import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

export default function ImageSection() {
  const { control } = useFormContext()  //to link the form field to the form


  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an to appear alongside your restaurant listing in the search results. Adding an image will orverwrtite the existing one.
        </FormDescription>

        <div className="flex flex-col gap-8 w-[50%]">
          <FormField
            control={control}
            name="imageFile"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-white cursor-pointer"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(event) =>
                      field.onChange(
                        event.target.files ? event.target.files[0] : null
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}
