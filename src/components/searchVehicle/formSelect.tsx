import { useState, useEffect } from "react"
import { asyncGetModels } from "./functions/asyncGetModels"
import type { Brand, VehicleType } from "."
import { asyncGetYears } from "./functions/asyncGetYears"
import { asyncGetVehicle } from "./functions/asyncSearchVehicle"
import { Button } from "../button"
import { Vehicle } from "./vehicle"

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

export type Vehicle = {
    id: string,
    year_code: string,
    year: number,
    vehicle_type: VehicleType,
    brand: string,
    brand_code: number,
    model: string,
    model_code: string,
    price: string,
    fuel: string | null,
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
    const [vehicle, setVehicle] = useState<Vehicle | null>(null)

    async function handleBrandChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedBrand(e.target.value)
        setSelectedModel('')
        setSelectedYear('')
        setYears([])
        setVehicle(null)

        const updateModels = await asyncGetModels(type, e.target.value)
        if (updateModels) setModels(updateModels)
    }

    async function handleModelChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedModel(e.target.value)
        setSelectedYear('')
        setVehicle(null)

        const updateYears = await asyncGetYears(type, selectedBrand, e.target.value)
        if (updateYears) setYears(updateYears)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!selectedBrand || !selectedModel || !selectedYear) return

        const data = await asyncGetVehicle(type, selectedBrand, selectedModel, selectedYear)
        if (data) setVehicle(data)
    }

    function translateVehicleType(type: VehicleType) {
        switch (type) {
            case 'cars':
                return 'carros'
            case 'motorcycles':
                return 'motos'
            case 'trucks':
                return 'caminhões'
            default:
                return ''
        }
    }

    useEffect(() => {
        const resetForm = () => {
            setSelectedBrand('')
            setSelectedModel('')
            setSelectedYear('')
            setModels([])
            setYears([])
            setVehicle(null)
        }
        resetForm()
    }, [type])

    return (
        <>
            <form action="" id="search-vehicle-form" onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xl">
                <h2>
                    Buscando por <span>{translateVehicleType(type)}</span>
                </h2>

                <div>
                    <select name="brand" value={selectedBrand} onChange={handleBrandChange} className="w-full">
                        <option value="">Selecione a marca</option>
                        {brands.map(brand => (
                            <option key={brand.brand_code} value={brand.brand_code}>{brand.brand_name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <select name="model" value={selectedModel} onChange={handleModelChange} className="w-full">
                        <option value="">Selecione o modelo</option>
                        {models.map(model => (
                            <option key={model.model_code} value={model.model_code}>{model.model_name}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <select name="year" value={selectedYear} onChange={(e) => { setSelectedYear(e.target.value); setVehicle(null) }} className="w-full">
                        <option value="">Selecione o ano</option>
                        {years.map(year => (
                            <option key={year.year_code} value={year.year_code}>{year.year_name}</option>
                        ))}
                    </select>
                </div>

                <Button theme="green" type="submit" disabled={!selectedBrand || !selectedModel || !selectedYear}>Pesquisar</Button>
            </form>

            {vehicle && <Vehicle vehicleObj={vehicle} />}
        </>
    )
}