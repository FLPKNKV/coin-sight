import { User } from "../types/user-interface"

export interface inputAction {
    updateFirstName: (firstName: User['firstName']) => void,
    updateLastName: (lastName: User['lastName']) => void,
    updateEmailAddress: (emailAddress: User['emailAddress']) => void;
}