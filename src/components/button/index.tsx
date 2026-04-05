import React from "react";
import clsx from "clsx"


type buttonThemes = 'blue' | 'purple' | 'red' | 'green' | 'ghost-white' | 'ghost-purple' | 'ghost-red'

type ButtonProps = {
    children: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    value?: string
    theme?: buttonThemes
    type?: "button" | "submit" | "reset"
    disabled?: boolean
}

const buttonThemes = {
    blue: "bg-blue-400 text-yellow-100 hover:bg-blue-500 focus:bg-blue-500",
    purple: "bg-purple-400 text-white hover:bg-purple-500 focus:bg-purple-500",
    red: "bg-red-400 text-white hover:bg-red-500 focus:bg-red-500",
    green: "bg-green-600 text-white hover:bg-green-700 focus:bg-green-700",
    "ghost-white": "bg-transparent text-gray-400 focus:text-gray-100",
    "ghost-purple": "bg-transparent text-purple-400 focus:text-purple-100",
    "ghost-red": "bg-transparent text-red-400 focus:text-red-100",

}

export function Button({ children, onClick, value, theme = 'blue', type = "button", disabled }: ButtonProps) {
    return (
        <button
            value={value}
            onClick={onClick}
            className={clsx(
                buttonThemes[theme],
                "px-4 py-2 rounded",
                "transition-colors font-bold text-w",
                "disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed"
            )}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    )
}