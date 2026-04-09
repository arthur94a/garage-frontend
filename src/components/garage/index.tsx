import { useEffect, useState } from "react"
import { useUserContext } from "@hook/useUserContext"
import { asyncListVehicles } from "./functions/asyncListVehicles"
import type { Vehicle } from "../searchVehicle/formSelect"
import { VehicleCard } from "../vehicleCard"

export function Garage({ refreshKey = 0, onVehicleChanged }: { refreshKey?: number, onVehicleChanged?: () => void }) {
    const { user } = useUserContext()
    const [vehicles, setVehicles] = useState<Vehicle[]>([])

    async function refreshVehicles() {
        const list = await asyncListVehicles({ user_id: user.user_id })
        setVehicles(list ?? [])
    }
    
    if (!user.login) return null

    useEffect(() => {
        refreshVehicles()
    }, [refreshKey])

    return (
        <div className="py-10 flex flex-col items-center">
            <h2>Meus veículos</h2>

            <ul className="flex flex-wrap gap-4 justify-center mt-6">
                {vehicles.map(vehicle => {
                    return (
                        <li key={String(vehicle.id) + String(vehicle.year_code)}>
                            <VehicleCard
                                vehicleObj={vehicle}
                                hasVehicle={true}
                                onVehicleChanged={async () => {
                                    try {
                                        await refreshVehicles()
                                    } finally {
                                        onVehicleChanged?.()
                                    }
                                }}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}