import { useState } from "react"
import { Login } from "../login"
import { CreateUser } from "../login/createUser"
import { useUserContext } from "@/context/userContext/hook/useUserContext"
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter"
import { Button } from "../button"
import { DeleteUser } from "../login/deleteUser"

export function Header() {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    const { user, userLogout } = useUserContext()

    const userLoggedIn = user.login

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
            <header className="py-4">
                <nav>
                    {!userLoggedIn && (
                        <>
                            <Button theme="ghost-purple" onClick={toggleLogin}>Login</Button>
                            <Button theme="ghost-purple" onClick={toggleRegister}>Registrar</Button>
                        </>
                    )}
                </nav>

                {userLoggedIn && (
                    <div className="flex flex-row items-center justify-between gap-2 px-4">
                        <DeleteUser />

                        <div className="flex items-center gap-4">
                            <span className="text-white">{capitalizeFirstLetter(user.name)}</span>
                            <Button theme="red" onClick={userLogout}>Logout</Button>
                        </div>
                    </div>
                )}
                
                <div className="h-10">
                    {!userLoggedIn && showLogin && <Login />}
                    {!userLoggedIn && showRegister && <CreateUser />}
                </div>

                <h1>Garage</h1>
            </header>
        </>
    )
}