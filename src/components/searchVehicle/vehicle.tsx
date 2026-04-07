import { useState } from "react"
import type { Vehicle } from "./formSelect"
import { useUserContext } from "@hook/useUserContext"
import clsx from "clsx"
import { asyncSaveVehicle } from "./functions/asyncSaveVehicle"
import { asyncRemoveVehicle } from "./functions/asyncRemoveVehicle"

export function Vehicle({ vehicleObj }: { vehicleObj: Vehicle }) {
    const [active, setActive] = useState(false)
    const [saved, setSaved] = useState(false)
    const { user } = useUserContext()
    

    function handleClick() {
        setActive(prev => !prev)
    }

    async function handleSave() {
        try {
            const result = await asyncSaveVehicle(user.user_id, vehicleObj.id, vehicleObj.year_code)
            if (result) {
                setActive(false)
                setSaved(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function handleRemove() {
        try {
            const result = await asyncRemoveVehicle(user.user_id, vehicleObj.id, vehicleObj.year_code)
            if (result) {
                setActive(false)
                setSaved(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="relative mt-4">
            <article
                onClick={handleClick}
                className="relative outline outline-gray-300 p-4 rounded-lg z-10 bg-zinc-900 cursor-pointer"
            >
                <h3 className="font-bold text-amber-200">{vehicleObj.model}</h3>

                <div>
                    <p>Marca: {vehicleObj.brand}</p>
                    <p>Ano: {vehicleObj.year}</p>
                    <p>Combustível: {vehicleObj.fuel}</p>
                    <p>Código FIPE: {vehicleObj.id}</p>
                    <p className="text-green-500">Preço: {vehicleObj.price}</p>
                </div>
            </article>

            {user.login && (
                <>
                    <span
                        className={clsx(
                            "absolute left-[95%] top-2",
                            "py-1 px-4",
                            "cursor-pointer",
                            "bg-green-300",
                            "text-black",
                            "rounded",
                            "z-0",
                            "transition-transform duration-500 ease-in-out",
                            {
                                "translate-x-0": active && !saved,
                                "-translate-x-full": (active && saved) || (!active && saved),
                                "-translate-x-3/4": !active && !saved,
                            }
                        )}
                        onClick={handleSave}
                    >
                        Salvar
                    </span>

                    <span
                        className={clsx(
                            "absolute left-[95%] top-12",
                            "py-1 px-4",
                            "cursor-pointer",
                            "bg-red-300",
                            "text-black",
                            "rounded",
                            "z-0",
                            "transition-transform duration-500 ease-in-out",
                            {
                                "translate-x-0": active && saved,
                                "-translate-x-full": (active && !saved) || (!active && !saved),
                                "-translate-x-3/4": !active && saved,
                            }
                        )}
                        onClick={handleRemove}
                    >
                        Remover
                    </span>
                </>
            )}
        </div>
    )
}