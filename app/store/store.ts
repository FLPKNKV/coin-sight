import { create } from "zustand";

type inputState = {
    firstName: string,
    lastName: string,
}

type phoneState = {
    countryCode: string,
    phoneNumber: string,
}

type inputAction = {
    updateFirstName: (firstName: inputState['firstName']) => void,
    updateLastName: (lastName: inputState['lastName']) => void,
}

type phoneAction = {
    updateCountryCode: (countryCode: phoneState['countryCode']) => void,
    updatePhoneNumber: (phoneNumber: phoneState['phoneNumber']) => void
}


export const useInputStore = create<inputState & inputAction>((set) => ({
    firstName: '',
    lastName: '',
    updateFirstName: (firstName) => set({ firstName }),
    updateLastName: (lastName) => set({ lastName }),
}));

export const usePhoneStore = create<phoneState & phoneAction>((set) => ({
    countryCode: 'US',
    phoneNumber: '',
    updateCountryCode: (countryCode) => set({ countryCode }),
    updatePhoneNumber: (phoneNumber) => set({ phoneNumber }),
}));

