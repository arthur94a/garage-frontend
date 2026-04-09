import axiosApi from "@/configs/axiosApi";

export async function asyncListVehicles({user_id}: {user_id: number}) {
    try {
        const response = await axiosApi.get('/users/vehicles', {
            params: {user_id}
        })

        console.log(response)

        if (response.status === 200) {
            return response.data
        }

        return null
    } catch (error) {
        console.error(error)
        return null
    }
}