import { useState } from 'react'
import axiosApi from '@/configs/axiosApi'
import { Button } from '@/components/button'


export function CreateUser() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function createUser() {
        try {
            const response = await axiosApi.post("/users/create", { name, email, password })
            return response
        } catch (error) {
            console.error("Erro ao criar usuário:", error)
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        createUser()
        console.log("Formulário enviado")
        console.log({name, email, password})
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button theme="purple" type="submit">Criar conta</Button>
        </form>
    )
}