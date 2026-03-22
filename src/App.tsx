//START DA APLICAÇÃO

import { UserContextProvider } from "./context/userContext/userContextProvider"
import { Header } from "./components/header"

function App() {

  return (
    <UserContextProvider>
      <Header />
    </UserContextProvider>
  )
}

export default App
