"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { userDetailValidationSchema } from "../schemas/userDetailSchema"
import { createUserWithEmailAndPassword, auth } from "../../lib/firebase"
import { getFirebaseErrorMessage } from "../../lib/firebaseErrMessage"
import { useInputStore } from "../store/store"
import { FirebaseError } from "firebase/app"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

const Register = () => {
    const {
        firstName,
        lastName,
        emailAddress,
        password,
        repeatPassword,
        updateEmailAddress,
        updateFirstName,
        updateLastName,
        updatePassword,
        updateRepeatPassword,
        addError,
    } = useInputStore()
    const [loading, setLoading] = React.useState<boolean>(false)
    const [errors, setErrors] = React.useState<{
        firstName?: string
        lastName?: string
        emailAddress?: string,
        password?: string,
        repeatPassword?: string
    }>({})
    const router = useRouter()

    const handleClick = async () => {
        const result = userDetailValidationSchema.safeParse({ firstName, lastName, emailAddress, password, repeatPassword })

        if (!result.success) {
            const resultErrors = result.error.format()
            setErrors({
                firstName: resultErrors.firstName?._errors[0],
                lastName: resultErrors.lastName?._errors[0],
                emailAddress: resultErrors.emailAddress?._errors[0],
                password: resultErrors.password?._errors[0],
                repeatPassword: resultErrors.repeatPassword?._errors[0],
            })
        } else {
            setErrors({})
            setLoading(true)
           try {
             if (emailAddress && password) {
                 await createUserWithEmailAndPassword(auth, emailAddress, password);
             } else {
                 router.push("/error");
             }
             router.push("/success");
           }
           catch(err) {
            if(err instanceof FirebaseError){
                const errorMessage = getFirebaseErrorMessage(err?.code);
                addError(errorMessage);
            }
           }
        }
    }

    if (loading ) {
        return <Spinner />
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className='animate-fadeInSlide p-6 sm:w-1/4 md:flex md:flex-col md:m-auto'>
                <p className='text-2xl text-left font-bold mb-4'>
                    Registration details:
                </p>
                <p className='text-xs mb-1 text-black'>First name:</p>
                <Input
                    value={firstName}
                    onChange={(e) => updateFirstName(e.target.value)}
                    type='text'
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
                <p className='text-xs mb-1 mt-2 text-black'>Last name:</p>
                <Input
                    value={lastName}
                    onChange={(e) => updateLastName(e?.target.value)}
                    type='text'
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
                <p className='text-xs mb-1 mt-2 text-black'>Email address:</p>
                <Input
                    value={emailAddress}
                    onChange={(e) => updateEmailAddress(e?.target.value)}
                    type='text'
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
                <p className='text-xs mb-1 mt-2 text-black'>Password:</p>
                <Input
                    value={password}
                    onChange={(e) => updatePassword(e?.target.value)}
                    type='password'
                    placeholder='Your password'
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
                <p className='text-xs mb-1 mt-2 text-black'>Repeat password:</p>
                <Input
                    value={repeatPassword}
                    onChange={(e) => updateRepeatPassword(e?.target.value)}
                    type='password'
                    placeholder='Repeat Password'
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
                <Button disabled={!emailAddress || !repeatPassword} onClick={handleClick}>
                    Continue
                </Button>
                <Link href="/login" className='flex justify-center items-center text-l mt-8 text-purple-600 font-bold'>
                    Already have an account?
                </Link>
            </div>
        </div>
    )
}

export default Register
