"use client"

import React from "react"
import Image from "next/image"
import TextInput from "../components/TextInput"
import Button from "../components/Button"
import { useRouter } from "next/navigation"
import { useInputStore } from "../store/store"
import { userDetailValidationSchema } from "../schemas/userDetailSchema"

const Password = () => {
    const router = useRouter();
    const { password, updatePassword, repeatPassword, updateRepeatPassword } = useInputStore();
    const [errors, setErrors] = React.useState<{ password?: string; repeatPassword?: string }>({});

    const handleClick = () => {
        const result = userDetailValidationSchema.safeParse({ password, repeatPassword });

        if(!result.success){
            const resultErrors = result.error.format()
            setErrors({
                password: resultErrors.password?._errors[0],
                repeatPassword: resultErrors.confirmPassword?._errors[0]
            })
        }
        else {
            setErrors({})
            router.push("/success")
        }
    }
    return (
        <>
            <div className='flex flex-col items-center justify-center pt-[59px]'>
                <Image src='/logo.svg' alt='logo' width={80} height={80} />
                <div className='flex flex-row items-center justify-center p-2 gap-2'>
                    <div className='font-garamond w-8 h-8 rounded-full flex items-center justify-center border text-white bg-primary p-2'>
                        1
                    </div>
                    <div className='font-garamond w-8 h-8 rounded-full flex items-center justify-center border text-white bg-gray p-2'>
                        2
                    </div>
                </div>
            </div>
            <div className='animate-fadeInSlide p-6 md:w-1/4 md:flex md:flex-col md:m-auto'>
                <p className='font-garamond text-xl text-left font-bold mb-2'>
                    Registration details:
                </p>
                <p className='text-sm mb-1 font-grotesk text-black'>Password:</p>
                <TextInput
                    value={password}
                    onChange={(e) => updatePassword(e?.target.value)}
                    type='text'
                    error={errors.password}
                    placeholder='Your Password'
                />
               
                <p className='text-sm mb-1 font-grotesk text-black'>Repeat Password:</p>
                <TextInput
                    value={repeatPassword}
                    onChange={(e) => updateRepeatPassword(e?.target.value)}
                    type='text'
                    error={errors.repeatPassword}
                    placeholder='Repeat your password'
                />
                <Button onClick={handleClick} disabled={!password || !repeatPassword}>Register</Button>
            </div>
           
        </>
    )
}

export default Password;
