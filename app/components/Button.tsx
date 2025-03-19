import React from "react"

interface ButtonProps {
    disabled: boolean,
    onClick: () => void,
    children: React.ReactNode
}

const Button = ({disabled, onClick, children}:ButtonProps) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`${
                disabled
                    ? "w-full bg-red-200 font-grotesk font-bold cursor-not-allowed text-white p-4 rounded-full mt-4 mb-4"
                    : "w-full bg-primary font-grotesk font-bold text-white p-4 rounded-full mt-4 mb-4"
            }`}
        >
            {children}
        </button>
    )
}

export default Button
