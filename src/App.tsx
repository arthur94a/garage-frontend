//START DA APLICAÇÃO
import { Footer } from "./components/footer"
import { Header } from "./components/header"
import { SearchVehicle } from "./components/searchVehicle"

function App() {
  return (
    <>  
      <Header />

      <main>
        <SearchVehicle />
      </main>

      <Footer />
    </>
  )
}

export default App
