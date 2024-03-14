import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi"
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"


function UserProfilePage() {
    const { currentUser, isLoading: isGetLoading } = useGetMyUser()
    const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser()

    if (isGetLoading) {
        return <span>Loading...</span>
    }

    if (!currentUser) {
        return <span>Unable to load user profile</span>
    }

    return (
        //when the form is submitted => calls onSave=>passes the form values to the updateUser func 
        <UserProfileForm
            currentUser={currentUser}
            onSave={updateUser}
            isLoading={isUpdateLoading} />
    )
}


export default UserProfilePage