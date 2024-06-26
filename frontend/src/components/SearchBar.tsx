import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useEffect } from "react"


const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required"
  })
})

export type SearchForm = z.infer<typeof formSchema>

type Props = {
  onSubmit: (formData: SearchForm) => void
  placeHolder: string
  onReset?: () => void
  searchQuery?: string;
}

export default function SearchBar({ onSubmit, onReset, placeHolder, searchQuery }: Props) {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),//to tie the validation schema to the form 
    defaultValues: {
      searchQuery: ""
    }
  })

  useEffect(() => {
    form.reset({ searchQuery })
  }, [form, searchQuery])


  const handleReset = () => {
    form.reset({
      searchQuery: ""
    })

    if (onReset) {
      onReset()
    }
  }
  //we implement the searchbar as a form
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-3 justify-between bg-white flex-row border-2  rounded-lg p-3 ${form.formState.errors.searchQuery && "border-red-500"}`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-green-800 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => ( //comes from the FormFiled
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* CLEAR BUTTON */}
        <Button
          onClick={handleReset}
          type="button"
          variant="outline"
          className="rounded-md"
        >
          Clear
        </Button>

        <Button
          type="submit"
          className="rounded-sm bg-green-800">
          Search
        </Button>

      </form>
    </Form >
  )
}
