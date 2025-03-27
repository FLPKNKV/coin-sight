import { AxiosError } from "axios"

export type User = {
    firstName?: string
    lastName?:string
    password: string
    repeatPassword?: string
    emailAddress?: string
    error?: AxiosError | unknown
}