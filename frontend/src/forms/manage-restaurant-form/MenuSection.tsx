import { Button } from "@/components/ui/button"
import { FormDescription, FormField, FormItem } from "@/components/ui/form"
import { useFieldArray, useFormContext } from "react-hook-form"
import MenuItemInput from "./MenuItemInput"

export default function MenuSection() {
    const { control } = useFormContext() //to link the form field to the form

    const { fields, append, remove } = useFieldArray({
        control,
        name: "menuItems"
    })

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Menu</h2>
                <FormDescription>Create your menu and give each item a name and a price</FormDescription>
            </div>
            <FormField
                control={control}
                name="menuItems"
                render={() => (
                    <FormItem className="flex flex-col gap-2">
                        {fields.map((_, index) => (
                            <MenuItemInput
                                index={index}
                                removeMenuItem={() => remove(index)}
                            />
                        ))}
                    </FormItem>
                )}
            />
            <Button
                className="bg-emerald-600"
                type="button"
                onClick={() => append({ name: "", price: "" })}
            >Add Menu Item</Button>
        </div>
    )
}