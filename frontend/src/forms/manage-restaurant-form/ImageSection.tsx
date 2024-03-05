import { AspectRatio } from "@/components/ui/aspect-ratio"
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

export default function ImageSection() {
  const { control, watch } = useFormContext()  //to link the form field to the form

  const existingImageUrl = watch("imageUrl") //this const is going to have the cloudinary url that is part of the restaurant object

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an to appear alongside your restaurant listing in the search results. Adding an image will orverwr ite the existing one.
        </FormDescription>

        <div className="flex flex-col gap-8 md:w-[50%]">
          {existingImageUrl && (
            <AspectRatio ratio={16 / 9}>
              <img
                src={existingImageUrl}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          )}
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
