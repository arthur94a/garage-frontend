import { useState, useEffect } from "react"
import { asyncGetModels } from "./functions/asyncGetModels"
import type { Brand, VehicleType } from "."
import { asyncGetYears } from "./functions/asyncGetYears"
import { asyncGetVehicle } from "./functions/asyncSearchVehicle"

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

type Vehicle = {
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
    const hasModels = models.length > 0
    const hasYears = years.length > 0

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
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <select value={selectedBrand} onChange={handleBrandChange}>
                        <option value="">Selecione a marca</option>
                        {brands.map(brand => (
                            <option key={brand.brand_code} value={brand.brand_code}>{brand.brand_name}</option>
                        ))}
                    </select>
                </div>

                {hasModels && (
                    <div>
                        <select value={selectedModel} onChange={handleModelChange}>
                            <option value="">Selecione o modelo</option>
                            {models.map(model => (
                                <option key={model.model_code} value={model.model_code}>{model.model_name}</option>
                            ))}
                        </select>
                    </div>
                )}

                {hasYears && (
                    <div>
                        <select value={selectedYear} onChange={(e) => { setSelectedYear(e.target.value); setVehicle(null) }}>
                            <option value="">Selecione o ano</option>
                            {years.map(year => (
                                <option key={year.year_code} value={year.year_code}>{year.year_name}</option>
                            ))}
                        </select>
                    </div>
                )}

                <button type="submit" disabled={!selectedBrand || !selectedModel || !selectedYear}>Pesquisar</button>
            </form>

            {vehicle && (
                <div>
                    <h3>Resultado</h3>
                    <p><strong>Marca:</strong> {vehicle.brand}</p>
                    <p><strong>Modelo:</strong> {vehicle.model}</p>
                    <p><strong>Ano:</strong> {vehicle.year}</p>
                    <p><strong>Combustível:</strong> {vehicle.fuel}</p>
                    <p><strong>Código FIPE:</strong> {vehicle.id}</p>
                    <p><strong>Preço:</strong> {vehicle.price}</p>
                </div>
            )}
        </>
    )
}