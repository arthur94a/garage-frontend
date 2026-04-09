import { useState } from "react"
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter"
import { useUserContext } from "@hook/useUserContext"
import { Login } from "@component/login"
import { CreateUser } from "@component/login/createUser"
import { DeleteUser } from "@component/login/deleteUser"
import { Button } from "@component/button"
import { UpdateUser } from "../login/updateUser"

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
                        <div>
                            <DeleteUser />
                            <UpdateUser />
                        </div>

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

                <h1>FIPE Garage</h1>
            </header>
        </>
    )
}