import type { Vehicle } from "./formSelect";

export function Vehicle({vehicleObj}: {vehicleObj: Vehicle}) {
    return (
        <article className="outline outline-gray-300 rounded-lg p-4 mt-4">
            <h3 className="font-bold text-amber-200">{vehicleObj.model}</h3>

            <div>
                <p>Marca: {vehicleObj.brand}</p>
                <p>Ano: {vehicleObj.year}</p>
                <p>Combustível: {vehicleObj.fuel}</p>
                <p>Código FIPE: {vehicleObj.id}</p>
                <p className="text-green-500">Preço: {vehicleObj.price}</p>
            </div>
        </article>
    )
}