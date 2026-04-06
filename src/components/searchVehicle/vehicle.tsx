import { useState } from "react"
import type { Vehicle } from "./formSelect"
import { useUserContext } from "@hook/useUserContext"
import clsx from "clsx"

export function Vehicle({ vehicleObj }: { vehicleObj: Vehicle }) {
    const [active, setActive] = useState(false)
    const { user } = useUserContext()

    function handleClick() {
        setActive(prev => !prev)
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
                <span
                    className={clsx(
                        "absolute left-[95%] top-2",
                        "py-1 px-4",
                        "cursor-pointer",
                        "text-black",
                        "bg-green-300",
                        "rounded",
                        "z-0",
                        "transition-transform duration-500 ease-in-out",
                        active ? "transform translate-x-[0%]" : "transform translate-x-[-75%]",
                    )}
                    onClick={() => console.log('salvar')}
                >
          Salvar
                </span>
            )}
        </div>
    )
}