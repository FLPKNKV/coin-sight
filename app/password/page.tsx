"use client"

import React from "react"
import Image from "next/image"
import TextInput from "../components/TextInput"
import Button from "../components/Button"
import { useRouter } from "next/navigation"
import { useInputStore } from "../store/store"
import { userPasswordValidationSchema } from "../schemas/userDetailSchema"
import { AxiosError } from "axios"
import axios from "axios"
import Spinner from "../components/Spinner"

const Password = () => {
    const router = useRouter()
    const {
        emailAddress,
        password,
        updatePassword,
        repeatPassword,
        updateRepeatPassword,
        addError,
    } = useInputStore()
    const [errors, setErrors] = React.useState<{ password?: string; repeatPassword?: string }>({})
    const [loading, setLoading] = React.useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false)

    const handleClick = async () => {
        const result = userPasswordValidationSchema.safeParse({ password, repeatPassword })

        if (!result.success) {
            const resultErrors = result.error.format()
            setErrors({
                password: resultErrors.password?._errors[0],
                repeatPassword: resultErrors.repeatPassword?._errors[0],
            })
        } else {
            setErrors({})
            try {
                setLoading(true)
                setIsSubmitted(true)
                await axios.post("/api/password", {
                    password,
                    repeatPassword,
                    emailAddress
                })
                router.push("/success") 
            } catch (error) {                
                console.log("Error setting password", error)
                router.push("/error")
                addError(error as AxiosError)
            } finally {
                setLoading(false)
            }
        }
        
    }

    if(loading || isSubmitted){
        return <Spinner />
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className='animate-fadeInSlide p-6 md:w-1/4 md:flex md:flex-col md:m-auto'>
                <p className='font-spacemono text-2xl text-left font-bold mb-2'>
                    Password details:
                </p>
                <p className='text-xs mb-1 font-spacemono text-black'>Password:</p>
                <TextInput
                    value={password}
                    onChange={(e) => updatePassword(e?.target.value)}
                    type='password'
                    error={errors.password}
                    placeholder='Your Password'
                />
                {errors.password && (
                    <div className='flex'>
                        <Image
                            src='/validation.svg'
                            alt='logo'
                            className='mb-2 mr-1'
                            width={16}
                            height={16}
                        />{" "}
                        <p className='text-red-500 text-sm mb-2'>{errors.password}</p>
                    </div>
                )}
                <p className='text-xs mb-1 font-spacemono text-black'>Repeat Password:</p>
                <TextInput
                    value={repeatPassword}
                    onChange={(e) => updateRepeatPassword(e?.target.value)}
                    type='password'
                    error={errors.repeatPassword}
                    placeholder='Repeat your password'
                />
                {errors.repeatPassword && (
                    <div className='flex'>
                        <Image
                            src='/validation.svg'
                            alt='logo'
                            className='mb-2 mr-1'
                            width={16}
                            height={16}
                        />{" "}
                        <p className='text-red-500 text-sm mb-2'>{errors.repeatPassword}</p>
                    </div>
                )}
                <Button onClick={handleClick} disabled={!password || !repeatPassword}>
                    Register
                </Button>
            </div>
        </div>
    )
}

export default Password
