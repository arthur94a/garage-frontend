import { useState } from "react"

import { FormSelect } from "./formSelect"
import { asyncGetBrands } from "./functions/asyncGetBrands"

export type VehicleType = 'cars' | 'motorcycles' | 'trucks'

export type Brand = {
  brand_code: number
  brand_name: string
  vehicle_type: VehicleType
}

export function SearchVehicle() {
    const [vehicleType, setVehicleType] = useState<VehicleType>('cars')
    const [brands, setBrands] = useState<Brand[]>([])
    const hasBrands = brands.length > 0

    async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        const currentTypeValue = e.currentTarget.value as VehicleType
        setVehicleType(currentTypeValue)

        const updateBrands = await asyncGetBrands(currentTypeValue)
        if (updateBrands) setBrands(updateBrands)
    }

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

            {hasBrands && <FormSelect type={vehicleType} brands={brands} />}
        </section>
    )
}