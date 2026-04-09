import axiosApi from "@/configs/axiosApi"

export async function asyncRemoveVehicle(id: number, fipeCode: string, yearCode: string) {
    
    const data = {
        "user_id": id,
        "vehicle_id": fipeCode,
        "year_code": yearCode
    }
    
    const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer your-access-token',
    };
    
    try {
        const response = await axiosApi.delete('/users/vehicle/remove', { data, headers })
        
        if (response.status === 204) {
            return true
        }

        return false
    } catch (error) {
        console.error(error)
        return false
    }
}