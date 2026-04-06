import { useState } from 'react'
import axiosApi from '@/configs/axiosApi'
import { Button } from '@component/button'
import { useUserContext } from "@hook/useUserContext"


export function CreateUser() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [feedback, setFeedback] = useState("")

    const { userLogin } = useUserContext()

    async function createUser() {
        try {
            const response = await axiosApi.post("/users/create", { name, email, password })
            const { id } = response.data
            userLogin({ user_id: id, email, name, login: true })
        } catch (error) {
            console.error("Erro ao criar usuário:", error)
            setFeedback("Erro ao criar usuário. Verifique os dados e tente novamente.")
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        createUser()
    }

    return (
        <div>
            <form onSubmit={handleSubmit} id="create-user-form" className="bg-gray-700 w-fit rounded mx-auto outline outline-purple-400">
                <input name="name" autoComplete='name' className="px-4 py-1 bg-gray-700 focus:outline-none" type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
                <input name="email" autoComplete="email" className="px-4 py-1 bg-gray-700 focus:outline-none" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input name="password" autoComplete="new-password" className="px-4 py-1 bg-gray-700 focus:outline-none" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button theme="purple" type="submit">Criar conta</Button>
            </form>
            <span className="text-red-600">{feedback}</span>
        </div>
    )
}