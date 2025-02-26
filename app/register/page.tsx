"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Register = () => {
    const [firstName, setFirstName] = React.useState<string>("")
    const [lastName, setLastName] = React.useState<string>("")

    const router = useRouter()
    const handleClick = () => {
        router.push("/phone-validation")
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
                        setFirstName(e?.target.value)
                    }
                    type='text'
                    className='w-full p-4 border-gray_border focus:outline-none focus:ring-2 focus:border-primary cursor-pointer border-2 rounded-full mb-2'
                    placeholder='Your first name'
                />
                <p className='text-sm mb-1 text-black'>Last name:</p>
                <input
                    value={lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setLastName(e.target.value)
                    }
                    type='text'
                    className='w-full p-4 border-gray_border focus:outline-none focus:ring-2 focus:border-primary cursor-pointer border-2 rounded-full mb-2'
                    placeholder='Your last name'
                />
                <button
                    onClick={handleClick}
                    className='w-full bg-primary font-grotesk font-bold text-white p-4 rounded-full mt-4 mb-4'
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
