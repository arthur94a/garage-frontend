import axiosApi from "@/configs/axiosApi"

export async function asyncUserHasVehicle(id: number, fipeCode: string, yearCode: string) {
    const data = {
        "user_id": id,
        "vehicle_id": fipeCode,
        "year_code": yearCode
    }

    try {
        const response = await axiosApi.get('/users/vehicle', {
            params: data
        })

        if (response.status === 200) {
            return true
        }
        
        return false
    } catch (error) {
        console.error(error)
        return false
    }
}