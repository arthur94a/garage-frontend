import React, { useState } from "react"
import { Button } from "@component/button";
import axiosApi from "@/configs/axiosApi";
import { useUserContext } from "@hook/useUserContext"
import { clsx } from "clsx";

export function UpdateUser() {
    const [activeForm, setActiveForm] = useState(false)
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [feedback, setFeedback] = useState({ message: "", type: "" })
    const { user } = useUserContext()

    function resetForm() {
        setActiveForm(false)
        setCurrentPassword("")
        setNewPassword("")

        setTimeout(() => {
            setFeedback({ message: "", type: "" })
        }, 3000)
    }

    async function updateUser() {
        if ((currentPassword.trim() === "") || newPassword.trim() === "") {
            setFeedback({ message: "Preencha ambos os campos de senha.", type: "error" })
            resetForm()
            return
        }

        if (currentPassword.trim() === newPassword.trim()) {
            setFeedback({ message: "A nova senha não pode ser igual à senha atual.", type: "error" })
            resetForm()
            return
        }

        try {
            const data = {
                'user_id': user.user_id,
                'current_password': currentPassword,
                'new_password': newPassword
            }
            const response = await axiosApi.put(`/users/password/update/`, data)

            if (response.status === 204) {
                setFeedback({ message: "Senha atualizada com sucesso!", type: "success" })
                resetForm()
            }
        } catch (error) {
            setFeedback({ message: "Erro ao atualizar usuário. Verifique os dados e tente novamente.", type: "error" })
            resetForm()

            console.error("Erro ao atualizar usuário:", error)
        }
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        setActiveForm(!activeForm)
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        updateUser()
    }

    return (
        <div className="relative inline-block">
            <Button
                theme="ghost-white"
                onClick={handleClick}
            >
                Nova senha
            </Button>
            {feedback.message && (
                <span className={clsx(
                    feedback.type === "success" ? "text-green-500" : "text-red-500"
                )}>
                    {feedback.message}
                </span>
            )}

            {activeForm && (
                <form 
                    onSubmit={handleSubmit}
                    className={clsx(
                        "flex flex-col absolute",
                        "bg-gray-700 w-fit",
                        "rounded mx-auto",
                        "outline outline-purple-400",
                        "mt-2"
                    )}
                >
                    <input
                        name="currentPassword"
                        autoComplete='current-password'
                        className="px-4 py-1 bg-gray-700 focus:outline-none"
                        type="password" placeholder="Senha atual"
                        value={currentPassword}
                        required={true}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <input
                        name="newPassword"
                        autoComplete="new-password"
                        className="px-4 py-1 bg-gray-700 focus:outline-none"
                        type="password" placeholder="Nova senha"
                        value={newPassword}
                        required={true}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button theme="purple" type="submit">Atualizar Senha</Button>
                </form>
            )}
        </div>
    )
}