"use client"

import React from "react"
import TextInput from "../components/TextInput"
import Button from "../components/Button"
import Spinner from "../components/Spinner"
import { useInputStore, useLoginStore } from "../store/store"
import { signInWithEmailAndPassword, auth } from "../lib/firebase"
import { useRouter } from "next/navigation"
import { getFirebaseErrorMessage } from "../lib/firebaseErrMessage"

const Login = () => {
    const {addError} = useInputStore()
    const {emailAddress, updateEmailAddress, password, updatePassword,} = useLoginStore();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        setIsSubmitted(true);
        try {
          if (!emailAddress || !password) {
            throw new Error("Email address and password must be provided.");
          }
          await signInWithEmailAndPassword(auth, emailAddress, password);
          router.push("/success");
        } catch (err) {
            router.push("/error");
            console.log("Error", err)
            const errorMessage = getFirebaseErrorMessage(err?.code);
            addError(errorMessage);
        } finally {
          setLoading(false);
        }
      }

    if(loading || isSubmitted){
        return <Spinner />
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className='animate-fadeInSlide p-6 md:w-1/4 md:flex md:flex-col md:m-auto'>
                <p className='font-spacemono text-2xl text-left font-bold mb-4'>
                    Login:
                </p>
                <p className='text-xs mb-1 font-spacemono text-black'>Email Address:</p>
                <TextInput
                    value={emailAddress}
                    onChange={(e) => updateEmailAddress(e.target.value)}
                    type='text'
                    placeholder='Your email address'
                />
                <p className='text-xs mb-1 font-spacemono text-black'>Password:</p>
                <TextInput
                    value={password}
                    onChange={(e) => updatePassword(e?.target.value)}
                    type='password'
                    placeholder='Your password'
                />
                <Button disabled={!emailAddress || !password} onClick={handleLogin}>
                    Login
                </Button>
            </div>
        </div>
    )
}

export default Login
