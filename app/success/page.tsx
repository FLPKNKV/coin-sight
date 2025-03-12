"use client"

import Image from "next/image"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

const Success = () => {
    const route = useRouter();

    useEffect(() => {
        setTimeout(() => {
            route.push('/dashboard')
        },3000)
    }, []) // no dependecy because i want this to run only once when the component mounts. there won't be another redirect to the dashboard after this.

    return (
        <div className='animate-fadeInSlide flex flex-col items-center justify-center h-screen'>
            <Image src='/success.svg' alt='Success' width={120} height={120} />
            <p className='font-garamond font-bold text-2xl'>Congratulations</p>
            <p className='font-grotesk text-center text-sm duration-500 mt-2'>
                You have successfuly createad an account
            </p>
        </div>
    )
}

export default Success
