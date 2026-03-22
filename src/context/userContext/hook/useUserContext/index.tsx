import { useContext } from "react";
import { UserContext } from "../..";

export function useThemeContext() {
    const {user, userLogin, userLogout} = useContext(UserContext);

    return {user, userLogin, userLogout};
}