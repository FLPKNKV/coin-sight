"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { useInputStore, useLoginStore } from "../store/store"
import { signInWithEmailAndPassword, auth } from "../../lib/firebase"
import { useRouter } from "next/navigation"
import { getFirebaseErrorMessage } from "../../lib/firebaseErrMessage"
import { FirebaseError } from "firebase/app"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

const Login = () => {
    const { addError } = useInputStore()
    const { emailAddress, updateEmailAddress, password, updatePassword } = useLoginStore()
    const [loading, setLoading] = React.useState(false)
    const router = useRouter()

    const handleLogin = async () => {
        let errorMessage
        setLoading(true)
        try {
            if (!emailAddress || !password) {
                throw new Error("Email address and password must be provided.")
            }
            const userCredentials = await signInWithEmailAndPassword(auth, emailAddress, password)
            const user = userCredentials.user
            if(!user.emailVerified){
                alert("Please verify your email address before logging in.")
            }
            router.push("/dashboard")
        } catch (err) {
            console.log("Error", err)
            if (err instanceof FirebaseError) {
                errorMessage = getFirebaseErrorMessage(err?.code)
                addError(errorMessage)
            }
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return(
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        ) 
    }

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='animate-fadeInSlide p-6 md:w-1/4 md:flex md:flex-col md:m-auto'>
                <p className='font-spacemono text-2xl text-left font-bold mb-4'>Login:</p>
                <p className='text-xs mb-2 text-black'>Email Address:</p>
                <Input
                    value={emailAddress}
                    onChange={(e) => updateEmailAddress(e.target.value)}
                    type='text'
                    placeholder='Your email address'
                />
                <p className='text-xs mb-2 mt-2 text-black'>Password:</p>
                <Input
                    value={password}
                    onChange={(e) => updatePassword(e?.target.value)}
                    type='password'
                    placeholder='Your password'
                />
                <Button disabled={!emailAddress || !password} onClick={handleLogin} variant='default'>
                    Login
                </Button>
            </div>
        </div>
    )
}

export default Login
