"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { userDetailValidationSchema } from "../schemas/userDetailSchema"
import { useInputStore } from "../store/store"
import axios, { AxiosError } from "axios"
import TextInput from "../components/TextInput"
import Button from "../components/Button"
import Spinner from "../components/Spinner"

const Register = () => {
    const {
        firstName,
        lastName,
        emailAddress,
        updateEmailAddress,
        updateFirstName,
        updateLastName,
        addError,
    } = useInputStore()
    const [loading, setLoading] = React.useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false)
    const [errors, setErrors] = React.useState<{
        firstName?: string
        lastName?: string
        emailAddress?: string
    }>({})
    const router = useRouter()

    const handleClick = async () => {
        const result = userDetailValidationSchema.safeParse({ firstName, lastName, emailAddress })

        if (!result.success) {
            const resultErrors = result.error.format()
            setErrors({
                firstName: resultErrors.firstName?._errors[0],
                lastName: resultErrors.lastName?._errors[0],
                emailAddress: resultErrors.emailAddress?._errors[0],
            })
        } else {
            setErrors({})
            setLoading(true)
            setIsSubmitted(true)
            try {
                await axios.post(
                    "/api/register",
                    {
                        firstName,
                        lastName,
                        emailAddress,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                )
                router.push("/password")
            } catch (error) {
                router.push("/error")
                console.log("Registration failed", error)
                addError(error as AxiosError);
            } finally {
                setLoading(false)
            }
        }
    }

    if (loading || isSubmitted) {
        return <Spinner />
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className='animate-fadeInSlide p-6 md:w-1/4 md:flex md:flex-col md:m-auto'>
                <p className='font-spacemono text-2xl text-left font-bold mb-4'>
                    Registration details:
                </p>
                <p className='text-xs mb-1 font-spacemono text-black'>First name:</p>
                <TextInput
                    value={firstName}
                    onChange={(e) => updateFirstName(e.target.value)}
                    type='text'
                    error={errors.firstName}
                    placeholder='Your First Name'
                />
                {errors.firstName && (
                    <div className='flex'>
                        <Image
                            src='/validation.svg'
                            alt='logo'
                            className='mb-2 mr-1'
                            width={16}
                            height={16}
                        />{" "}
                        <p className='text-red-500 text-sm mb-2'>{errors.firstName}</p>
                    </div>
                )}
                <p className='text-xs mb-1 font-spacemono text-black'>Last name:</p>
                <TextInput
                    value={lastName}
                    onChange={(e) => updateLastName(e?.target.value)}
                    type='text'
                    error={errors.lastName}
                    placeholder='Your Last Name'
                />
                {errors.lastName && (
                    <div className='flex'>
                        <Image
                            src='/validation.svg'
                            alt='logo'
                            className='mb-2 mr-1'
                            width={16}
                            height={16}
                        />{" "}
                        <p className='text-red-500 text-sm mb-2'>{errors.lastName}</p>
                    </div>
                )}
                <p className='text-xs mb-1 font-spacemono text-black'>Email address:</p>
                <TextInput
                    value={emailAddress}
                    onChange={(e) => updateEmailAddress(e?.target.value)}
                    type='text'
                    error={errors.emailAddress}
                    placeholder='Your Email Address'
                />
                {errors.emailAddress && (
                    <div className='flex'>
                        <Image
                            src='/validation.svg'
                            alt='logo'
                            className='mb-2 mr-1'
                            width={16}
                            height={16}
                        />{" "}
                        <p className='text-red-500 text-sm mb-2'>{errors.emailAddress}</p>
                    </div>
                )}
                <Button disabled={!firstName || !lastName || !emailAddress} onClick={handleClick}>
                    Continue
                </Button>
                <p className='flex justify-center items-center font-spacemono text-l text-primary font-bold'>
                    Already have an account?
                </p>
            </div>
        </div>
    )
}

export default Register
