"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { userDetailValidationSchema } from "../schemas/userDetailSchema"
import { useInputStore } from "../store/store"
import TextInput from "../components/TextInput"
import Button from "../components/Button"

const Register = () => {
    const { firstName, lastName, emailAddress, updateEmailAddress, updateFirstName, updateLastName } = useInputStore();

    const [errors, setErrors] = React.useState<{ firstName?: string; lastName?: string, emailAddress?: string }>({})
    const router = useRouter()

    const handleClick = () => {
        const result = userDetailValidationSchema.safeParse({ firstName, lastName, emailAddress })

        if (!result.success) {
            const resultErrors = result.error.format()
            setErrors({
                firstName: resultErrors.firstName?._errors[0],
                lastName: resultErrors.lastName?._errors[0],
                emailAddress: resultErrors.emailAddress?._errors[0]
            })
        } else {
            setErrors({})
            router.push("/password")
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
                <p className='text-sm mb-1 font-grotesk text-black'>First name:</p>
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
                <p className='text-sm mb-1 font-grotesk text-black'>Last name:</p>
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
                <p className='text-sm mb-1 font-grotesk text-black'>Email address:</p>
                <TextInput
                    value={emailAddress}
                    onChange={(e) => updateEmailAddress(e?.target.value)}
                    type='text'
                    error={errors.lastName}
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
                <Button
                    disabled={!firstName || !lastName || !emailAddress}
                    onClick={handleClick}
                >
                    Continue
                </Button>
                <p className='flex justify-center items-center font-grotesk text-l text-primary font-bold'>
                    Already have an account?
                </p>
            </div>
        </>
    )
}

export default Register
