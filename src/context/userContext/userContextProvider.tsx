import { useState } from "react";
import { UserContext, type User } from "./index";

export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const sessionLoggedIn = 'loggedIn:1.0.0'

    const initialUser: User = {
        user_id: 0,
        email: "",
        name: "",
        login: false
    }

    const [user, setUser] = useState<User>(() => {
        const userSession = sessionStorage.getItem(sessionLoggedIn)

        if(userSession) {
            try {
                const userData = JSON.parse(userSession)

                return {
                    user_id: userData.id,
                    email: userData.email,
                    name: userData.name,
                    login: userData.login
                }
            } catch {
                sessionStorage.removeItem(sessionLoggedIn)
            }
        }

        return initialUser
    })

    function userLogin(userData: User) {
        const {user_id, email, name} = userData
        setUser({
            user_id: user_id,
            email: email,
            name: name,
            login: true
        })

        const loggedIn = JSON.stringify({id: user_id, email: email, name: name, login: true})

        sessionStorage.setItem(sessionLoggedIn, loggedIn)
    }

    function userLogout() {
        setUser(initialUser)

        sessionStorage.removeItem(sessionLoggedIn)
    }

    return (
        <UserContext.Provider value={{user, userLogin, userLogout}}>
            {children}
        </UserContext.Provider>
    )
}