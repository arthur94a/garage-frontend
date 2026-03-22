import { useState } from "react";
import { UserContext, type User } from "./index";



export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState({
        user_id: "",
        email: "",
        name: "",
        login: false
    });

    function userLogin(userData: User) {
        setUser({
            user_id: userData.user_id,
            email: userData.email,
            name: userData.name,
            login: true
        });
    }

    function userLogout() {
        setUser({
            user_id: "",
            email: "",
            name: "",
            login: false
        });
    }

    return (
        <UserContext.Provider value={{user, userLogin, userLogout}}>
            {children}
        </UserContext.Provider>
    );
}