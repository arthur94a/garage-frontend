import axiosApi from "@/configs/axiosApi"

export async function asyncGetVehicle(type: string, brandCode: string, modelCode: string, yearCode: string) {
    try {
        const response = await axiosApi.get(`/catch/${type}/brands/${brandCode}/models/${modelCode}/years/${yearCode}`)
        return(response.data)
    } catch (error) {
        console.error(error)
    }
}