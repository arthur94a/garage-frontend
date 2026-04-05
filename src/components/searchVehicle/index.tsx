import { useState } from "react"

import { FormSelect } from "./formSelect"
import { asyncGetBrands } from "./functions/asyncGetBrands"
import { Button } from "../button"

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

    async function handleClick(e?: React.MouseEvent<HTMLButtonElement>) {
        const currentTypeValue = e?.currentTarget.value as VehicleType
        setVehicleType(currentTypeValue)

        const updateBrands = await asyncGetBrands(currentTypeValue)
        if (updateBrands) setBrands(updateBrands)

        return
    }

    return (
        <section className="flex flex-col gap-4 items-center">
            Procure um veículo 

            <div className="flex gap-2 justify-center">
                <Button value={'cars'} onClick={handleClick} theme="blue">Carros</Button>
                <Button value={'motorcycles'} onClick={handleClick} theme="blue">Motos</Button>
                <Button value={'trucks'} onClick={handleClick} theme="blue">Caminhões</Button>
            </div>

            {hasBrands && <FormSelect type={vehicleType} brands={brands} />}
        </section>
    )
}