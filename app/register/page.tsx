"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useStore } from "../store/store"

const schema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
})

const Register = () => {
    const { firstName, lastName, updateFirstName, updateLastName } = useStore()
    const [errors, setErrors] = React.useState<{ firstName?: string; lastName?: string }>({})
    const router = useRouter()
    
    const handleClick = () => {
        const result = schema.safeParse({ firstName, lastName })

        if (!result.success) {
            const resultErrors = result.error.format()
            setErrors({
                firstName: resultErrors.firstName?._errors[0],
                lastName: resultErrors.lastName?._errors[0],
            })
        } else {
            setErrors({})
            router.push("/phone-validation")
        }
    }
    return (
        <>
            <div className='flex flex-col items-center justify-center pt-[59px]'>
                <Image src='/logo.svg' alt='logo' width={80} height={80} />
                <div className='flex flex-row items-center justify-center p-2 gap-2'>
                    <div className='w-8 h-8 rounded-full flex items-center justify-center border text-white bg-primary p-2'>
                        1
                    </div>
                    <div className='w-8 h-8 rounded-full flex items-center justify-center border text-white bg-gray p-2'>
                        2
                    </div>
                </div>
            </div>
            <div className='p-6'>
                <p className='font-garamond text-2xl text-left font-bold mb-2'>
                    Registration details:
                </p>
                <p className='text-sm mb-1 text-black'>First name:</p>
                <input
                    value={firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateFirstName(e?.target.value)
                    }
                    type='text'
                    className='w-full p-4 border-gray_border focus:outline-none focus:ring-2 focus:border-primary cursor-pointer border-2 rounded-full mb-2'
                    placeholder='Your first name'
                />
                {errors && (
                    <p className='text-red-500 text-sm mb-2'>{errors.firstName}</p>
                )}
                <p className='text-sm mb-1 text-black'>Last name:</p>
                <input
                    value={lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateLastName(e.target.value)
                    }
                    type='text'
                    className='w-full p-4 border-gray_border focus:outline-none focus:ring-2 focus:border-primary cursor-pointer border-2 rounded-full mb-2'
                    placeholder='Your last name'
                />
                {errors.lastName && <p className='text-red-500 text-sm mb-2'>{errors.lastName}</p>}
                <button
                    disabled={!firstName || !lastName}
                    onClick={handleClick}
                    className={`${!firstName || !lastName ? 'w-full bg-red-200 font-grotesk font-bold cursor-not-allowed text-white p-4 rounded-full mt-4 mb-4' : 'w-full bg-primary font-grotesk font-bold text-white p-4 rounded-full mt-4 mb-4' }` }
                >
                    Continue
                </button>
                <p className='flex justify-center items-center font-grotesk text-xl text-primary font-bold'>
                    Already have an account?
                </p>
            </div>
        </>
    )
}

export default Register
