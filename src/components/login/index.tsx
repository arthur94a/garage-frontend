import axiosApi from "@/configs/axiosApi"
import { useState } from "react"
import { useUserContext } from "@/context/userContext/hook/useUserContext"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { userLogin } = useUserContext()

    function handleSubmitLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        validateLogin(email, password)
    }

    async function validateLogin(email: string, password: string) {
        try {
            const response = await axiosApi.post("/users/login", { email, password })
            const {id, name} = response.data.data
            console.log(response)
            userLogin({ user_id: id, email, name, login: true })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmitLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Entrar</button>
        </form>
    )
}