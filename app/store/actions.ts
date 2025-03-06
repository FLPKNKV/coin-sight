import { User } from "../types/user-interface"
import { Phone } from "../types/phone-interface"

export interface inputAction {
    updateFirstName: (firstName: User['firstName']) => void,
    updateLastName: (lastName: User['lastName']) => void,
}

export interface phoneAction {
    updateCountryCode: (countryCode: Phone['countryCode']) => void,
    updatePhoneNumber: (phoneNumber: Phone['phoneNumber']) => void
}