import { useCreateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export default function ManagedRestaurantPage() {
    const { createRestaurant, isLoading } = useCreateMyRestaurant()
    return (
        <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} />
    )
}
