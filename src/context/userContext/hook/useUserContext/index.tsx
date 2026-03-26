import { useContext } from "react";
import { UserContext } from "../..";

export function useUserContext() {
    const {user, userLogin, userLogout} = useContext(UserContext);

    return {user, userLogin, userLogout};
}