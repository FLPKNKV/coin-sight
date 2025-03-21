import { User } from "../types/user-interface"

export interface inputAction {
    updateFirstName: (firstName: User['firstName']) => void,
    updateLastName: (lastName: User['lastName']) => void,
    updateEmailAddress: (emailAddress: User['emailAddress']) => void;
    updatePassword: (password: User['password']) => void,
    updateRepeatPassword: (repeatPassword: User['repeatPassword']) => void;
    addError: (addError: User['error']) => void;
}