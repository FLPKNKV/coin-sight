import { create } from "zustand";
import { User } from "../types/user-interface";
import { inputAction } from "./actions";

export const useInputStore = create<User & inputAction>((set) => ({
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
    emailAddress: '',
    error: undefined,
    addError: (error) => set({ error }),
    updateEmailAddress: (emailAddress) => set({ emailAddress }),
    updateFirstName: (firstName) => set({ firstName }),
    updateLastName: (lastName) => set({ lastName }),
    updatePassword: (password) => set({ password }),
    updateRepeatPassword: (repeatPassword) => set({ repeatPassword})
}));