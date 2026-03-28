import { useState, useEffect } from "react"
import { asyncGetModels } from "./functions/asyncGetModels"
import type { Brand, VehicleType } from "."

type Model = {
    created_at: string,
    updated_at: string,
    model_code: string,
    model_name: string,
    brand_code: number,
    vehicle_type: VehicleType
}

interface FormSelectProps {
    type: VehicleType
    brands: Brand[]
}

export function FormSelect({type, brands}: FormSelectProps) {
    const [selectedBrand, setSelectedBrand] = useState('')
    const [selectedModel, setSelectedModel] = useState('')
    const [models, setModels] = useState<Model[]>([])
    const hasModels = models.length > 0

    async function handleBrandChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedBrand(e.target.value)

        const updateModels = await asyncGetModels(type, e.target.value)
        if (updateModels) setModels(updateModels)
    }

    useEffect(() => {
        setSelectedBrand('')
        setSelectedModel('')
        setModels([])
    }, [type])

    return (
        <form action="">
            <select value={selectedBrand} onChange={handleBrandChange}>
                {brands.map(brand => {
                    return (
                        <option key={brand.brand_code} value={brand.brand_code}>{brand.brand_name}</option>
                    )
                })}
            </select>

            {hasModels && (
                <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                    {models.map(model => {
                        return (
                            <option key={model.model_code} value={model.model_code}>{model.model_name}</option>
                        )
                    })}
                </select>
            )}
        </form>
    )
}