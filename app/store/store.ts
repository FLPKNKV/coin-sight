import { create } from "zustand";
import { User } from "../types/user-interface";
import { Phone } from "../types/phone-interface";
import { inputAction, phoneAction } from "./actions";

export const useInputStore = create<User & inputAction>((set) => ({
    firstName: '',
    lastName: '',
    updateFirstName: (firstName) => set({ firstName }),
    updateLastName: (lastName) => set({ lastName }),
}));

export const usePhoneStore = create<Phone & phoneAction>((set) => ({
    countryCode: 'US',
    phoneNumber: '',
    updateCountryCode: (countryCode) => set({ countryCode }),
    updatePhoneNumber: (phoneNumber) => set({ phoneNumber }),
}));

