import { useState } from "react"
import axiosApi from "@/configs/axiosApi"
import { useUserContext } from "@hook/useUserContext"
import { Button } from "@component/button"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [feedback, setFeedback] = useState("")
    const { userLogin } = useUserContext()

    function handleSubmitLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        validateLogin(email, password)
    }

    async function validateLogin(email: string, password: string) {
        try {
            const response = await axiosApi.post("/users/login", { email, password })
            const {id, name} = response.data.data
            userLogin({ user_id: id, email, name, login: true })
        } catch (error) {
            console.error(error)
            setFeedback("Erro ao fazer login. Verifique suas credenciais e tente novamente.")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmitLogin} className="bg-gray-700 w-fit rounded mx-auto outline outline-purple-400">
                <input  name="email" autoComplete="email" className="px-4 py-1 bg-gray-700 focus:outline-none" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input name="password" autoComplete="current-password" className="px-4 py-1 bg-gray-700 focus:outline-none" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button theme="purple" type="submit">Entrar</Button>
            </form>

            <span className="text-red-600">{feedback}</span>
        </div>

    )
}