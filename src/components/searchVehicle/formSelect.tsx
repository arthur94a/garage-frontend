import { useState, useEffect } from "react"
import { asyncGetModels } from "./functions/asyncGetModels"
import type { Brand, VehicleType } from "."
import { asyncGetYears } from "./functions/asyncGetYears"

type Model = {
    created_at: string,
    updated_at: string,
    model_code: string,
    model_name: string,
    brand_code: number,
    vehicle_type: VehicleType
}

type Year = {
    created_at: string,
    updated_at: string,
    year_code: string,
    year_name: string,
    model_code: string,
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
    const [selectedYear, setSelectedYear] = useState('')
    const [models, setModels] = useState<Model[]>([])
    const [years, setYears] = useState<Year[]>([])
    const hasModels = models.length > 0
    const hasYears = years.length > 0

    async function handleBrandChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedBrand(e.target.value)

        const updateModels = await asyncGetModels(type, e.target.value)
        if (updateModels) setModels(updateModels)
    }

    async function handleModelChange(e: React.ChangeEvent<HTMLSelectElement>) {
            setSelectedModel(e.target.value)

            const updateYears = await asyncGetYears(type, selectedBrand, e.target.value)
            if (updateYears) setYears(updateYears)
    }

    // funcion handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //     e.preventDefault()


    // }

    useEffect(() => {
        setSelectedBrand('')
        setSelectedModel('')
        setSelectedYear('')
        setModels([])
    }, [type])

    return (
        <form action="">
            <div>
                <select value={selectedBrand} onChange={handleBrandChange}>
                    {brands.map(brand => {
                        return (
                            <option key={brand.brand_code} value={brand.brand_code}>{brand.brand_name}</option>
                        )
                    })}
                </select>
            </div>

            {hasModels && (
                <div>
                    <select value={selectedModel} onChange={handleModelChange}>
                        {models.map(model => {
                            return (
                                <option key={model.model_code} value={model.model_code}>{model.model_name}</option>
                            )
                        })}
                    </select>
                </div>
            )}

            {hasYears && (
                <div>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                        {years.map(year => {
                            return (
                                <option key={year.year_code} value={year.year_code}>{year.year_name}</option>
                            )
                        })}
                    </select>
                </div>
            )}

            <button type="submit">Pesquisar</button>
        </form>
    )
}