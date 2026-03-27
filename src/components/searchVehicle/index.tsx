import { useState } from "react"
import axiosApi from "@/configs/axiosApi"

type VehicleType = 'cars' | 'motorcyles' | 'trucks'

type Brand = {
  brand_code: number
  brand_name: string
  vehicle_type: VehicleType
}

export function SearchVehicle() {
    const [vehicleType, setVehicleType] = useState('cars')
    const [brands, setBrands] = useState<Brand[]>([])

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        const currentTypeValue = e.currentTarget.value
        setVehicleType(currentTypeValue)

        getBrands(currentTypeValue)
    }

    async function getBrands(type: string) {
        try {
            const response = await axiosApi.get<Brand[]>(`/catch/${type}/brands/`)
            setBrands(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    console.log('brands:', brands)

    return (
        <section>
            Procure um veículo 

            <div>
                <button value={'cars'} onClick={handleClick}>Carros</button>
                <button value={'motorcycles'} onClick={handleClick}>Motos</button>
                <button value={'trucks'} onClick={handleClick}>Caminhões</button>
            </div>

            <div>
                buscando por: <span>{vehicleType}</span>
            </div>

            <ul>
                {brands.map(brand => {
                    return (
                        <li key={brand.brand_code}>{brand.brand_name}</li>
                    )
                })}
            </ul>
        </section>
    )
}