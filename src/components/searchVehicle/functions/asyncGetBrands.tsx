import axiosApi from "@/configs/axiosApi"
import type { Brand } from ".."

export async function asyncGetBrands(type: string) {
    try {
        const response = await axiosApi.get<Brand[]>(`/catch/${type}/brands/`)
        return(response.data)
    } catch (error) {
        console.error(error)
    }
}