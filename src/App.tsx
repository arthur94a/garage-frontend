//START DA APLICAÇÃO
import { useState } from "react"
import { Footer } from "./components/footer"
import { Garage } from "./components/garage"
import { Header } from "./components/header"
import { SearchVehicle } from "./components/searchVehicle"

function App() {
    const [garageRefreshKey, setGarageRefreshKey] = useState(0)

    function handleVehicleChanged() {
        setGarageRefreshKey(k => k + 1)
        console.log('chamou')
    }

    return (
        <>
            <Header />

            <main>
                <SearchVehicle onVehicleChanged={handleVehicleChanged} />
                <Garage refreshKey={garageRefreshKey} onVehicleChanged={handleVehicleChanged} />
            </main>

            <Footer />
        </>
    )
}

export default App
