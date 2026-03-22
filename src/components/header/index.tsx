import { useState } from "react"
import { Login } from "../login"
import { CreateUser } from "../login/createUser"

export function Header() {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    function toggleLogin() {
        setShowLogin(!showLogin)
        setShowRegister(false)
    }

    function toggleRegister() {
        setShowRegister(!showRegister)
        setShowLogin(false)
    }
    
    return (
        <>
            <header>
                <h1>Garage</h1>

                <div>
                    <button onClick={toggleLogin}>Login</button>
                    <button onClick={toggleRegister}>Registrar</button>
                </div>
            </header>

            {showLogin && <Login />}
            {showRegister && <CreateUser />}
        </>
    )
}