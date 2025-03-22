import { AxiosError } from "axios"

export interface User {
    firstName?: string
    lastName?:string
    password: string
    repeatPassword?: string
    emailAddress?: string
    error?: AxiosError
}