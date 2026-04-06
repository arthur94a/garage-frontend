import { useUserContext } from "@hook/useUserContext"

export function Garage() {
    const { user } = useUserContext()
    
    if (!user.login) return null

    return (
        <div className="py-10">
            <h2>Meus veículos</h2>

            <ul>
                <li>Veículo 1</li>
                <li>Veículo 2</li>
                <li>Veículo 3</li>
            </ul>
        </div>
    )
}