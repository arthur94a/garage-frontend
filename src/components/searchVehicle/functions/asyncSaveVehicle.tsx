import axiosApi from "@/configs/axiosApi"

export async function asyncSaveVehicle(id: number, fipeCode: string, yearCode: string) {
    try {
        const response = await axiosApi.post('/users/vehicle/add', {
            "user_id": id,
            "vehicle_id": fipeCode,
            "year_code": yearCode
        })

        if (response.status === 201) {
            return true
        }

        return false
    } catch (error) {
        console.error(error)
        return false
    }
}