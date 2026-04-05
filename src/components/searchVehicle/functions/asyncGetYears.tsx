import axiosApi from "@/configs/axiosApi"

export async function asyncGetYears(type: string, brandCode: string, modelCode: string) {
    try {
        const response = await axiosApi.get(`/catch/${type}/brands/${brandCode}/models/${modelCode}/years/`)
        return(response.data)
    } catch (error) {
        console.error(error)
    }
}