import React, { useState } from "react"
import { Button } from "@component/button";
import axiosApi from "@/configs/axiosApi";
import { useUserContext } from "@hook/useUserContext"

export function DeleteUser() {
    const [feedback, setFeedback] = useState("")
    const { user, userLogout } = useUserContext()

    async function deleteUser() {
        try {
            await axiosApi.delete(`/users/delete/${user.user_id}`)
            userLogout()
        } catch (error) {
            console.error("Erro ao excluir usuário:", error)
            setFeedback("Erro ao excluir usuário. Verifique os dados e tente novamente.")
        }
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        deleteUser()
    }

    return (
        <>
            <Button theme="ghost-white" onClick={handleClick}>
                Excluir conta
            </Button>
            {feedback && <span>{feedback}</span>}
        </>
    )
}