import { createContext } from "react";

export type User = {
    user_id: string;
    email: string;
    name: string;
    login: boolean;
}

type UserContextType = {
    user: User;
    userLogin: (data: User) => void;
    userLogout: () => void;
};

export const UserContext = createContext({} as UserContextType);
