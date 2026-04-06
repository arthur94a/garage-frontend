import axiosApi from "@/configs/axiosApi"

export async function asyncGetModels(type: string, brandCode: string) {
    try {
        const response = await axiosApi.get(`/catch/${type}/brands/${brandCode}/models/`)
        return(response.data)
    } catch (error) {
        console.error(error)
    }
}