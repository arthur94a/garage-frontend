//START DA APLICAÇÃO
import { Footer } from "./components/footer"
import { Garage } from "./components/garage"
import { Header } from "./components/header"
import { SearchVehicle } from "./components/searchVehicle"

function App() {
    return (
        <>
            <Header />

            <main>
                <SearchVehicle />
                <Garage />
            </main>

            <Footer />
        </>
    )
}

export default App
