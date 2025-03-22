import React from 'react'

interface TextInputProps {
    value?:string,
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
    type: string,
    placeholder: string,
    error?: string
}

const TextInput = ({value, onChange, type, error, placeholder}:TextInputProps) => {
    return (
        <input
            value={value}
            onChange={onChange}
            type={type}
            className={`w-full p-4 border-2 rounded-full mb-2 border-gray_border focus:outline-none font-spacemono ${error ? "border-400 border-red-400 cursor-pointer border-2 rounded-full mb-2" : "border-gray_border focus:outline-none focus:ring-2 focus:border-primary"}`}
            placeholder={placeholder}/>
    )
}

export default TextInput