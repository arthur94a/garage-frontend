import { useState } from "react"
import { Login } from "../login"
import { CreateUser } from "../login/createUser"
import { useUserContext } from "@/context/userContext/hook/useUserContext"
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter"
import { Button } from "../button"

export function Header() {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const { user, userLogout } = useUserContext()

    const userLoggedIn = user.login

    console.log(userLoggedIn)

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
                <nav>
                    {!userLoggedIn && (
                        <>
                            <Button theme="ghost-purple" onClick={toggleLogin}>Login</Button>
                            <Button theme="ghost-purple" onClick={toggleRegister}>Registrar</Button>
                        </>
                    )}

                    {userLoggedIn && (
                        <Button theme="red" onClick={userLogout}>Logout</Button>
                    )}
                </nav>

                <h1>Garage</h1>
                
                {userLoggedIn && (
                    <div>
                        Bem-vindo {capitalizeFirstLetter(user.name)}
                    </div>
                )}
            </header>

            
            {!userLoggedIn && showLogin && <Login />}
            {!userLoggedIn && showRegister && <CreateUser />}
        </>
    )
}