"use client"

import React from "react"
import Image from "next/image"
import { usePhoneStore } from "../store/store"
import { countries } from "countries-list"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { phoneValidationSchema } from "../schemas/phoneSchema"
import Button from "../components/Button"
import TextInput from "../components/TextInput"

const Phone = () => {
    const router = useRouter()
    const { countryCode, phoneNumber, updateCountryCode, updatePhoneNumber } = usePhoneStore()
    const [errors, setErrors] = React.useState<{ phoneNumber?: string }>({})

    const handleClick = () => {
        const result = phoneValidationSchema.safeParse({ phoneNumber })

        if (!result.success) {
            const resultErrors = result.error.format()
            setErrors({
                phoneNumber: resultErrors.phoneNumber?._errors[0],
            })
        } else {
            setErrors({})
            router.push("/success")
        }
    }

    return (
        <>
            <div className='relative w-full'>
                <div className='absolute left-4 top-[100px]'>
                    <Link href='/'>
                        <Image
                            src='/arrow.svg'
                            alt='Back'
                            width={16}
                            height={16}
                            className='cursor-pointer'
                        />
                    </Link>
                </div>
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
            </div>
            <div className='animate-fadeInSlide p-6 md:w-1/4 md:flex md:flex-col md:m-auto'>
                <p className='font-garamond text-2xl text-left font-bold mb-4'>
                    Lets validate your number:
                </p>
                <div className='flex gap-2'>
                    <select
                        className={`${
                            errors.phoneNumber
                                ? "w-2/5 p-4 border-gray_border focus:outline-none border-red-400 cursor-pointer border-2 rounded-full mb-2 "
                                : "w-2/5 p-4 border-gray_border focus:outline-none focus:ring-2 focus:border-primary cursor-pointer border-2 rounded-full mb-2"
                        }`}
                        value={countryCode}
                        onChange={(e)=>updateCountryCode(e?.target.value)}
                        name='countryCode'
                        id=''
                    >
                        {Object.entries(countries).map(([code, country]) => (
                            <option key={code} value={code}>
                                + {country.phone} {country.name}
                            </option>
                        ))}
                    </select>
                    <TextInput
                        type='tel'
                        value={phoneNumber}
                        onChange={(e)=>updatePhoneNumber(e?.target.value)}
                        placeholder='Your phone number'
                        error={errors.phoneNumber}
                    />
                </div>
                {errors && <p className='text-red-500 text-sm mb-2'>{errors.phoneNumber}</p>}
                <span className='font-grotesk text-sm mt-4'>
                    By clicking ‘Continue’ you confirm that you agree to our
                    <Link href='/' className='text-primary'>
                        {" "}
                        terms and conditions
                    </Link>{" "}
                    and{" "}
                    <Link href='/' className='text-primary'>
                        privacy policy
                    </Link>
                </span>
                <Button disabled={!phoneNumber} onClick={handleClick}>
                    Continue
                </Button>
            </div>
        </>
    )
}

export default Phone
