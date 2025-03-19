import { create } from "zustand";
import { User } from "../types/user-interface";
import { inputAction } from "./actions";

export const useInputStore = create<User & inputAction>((set) => ({
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
    emailAddress: '',
    updateEmailAddress: (emailAddress) => set({ emailAddress }),
    updateFirstName: (firstName) => set({ firstName }),
    updateLastName: (lastName) => set({ lastName }),
    updatePassword: (password) => set({ password }),
    updateRepeatPassword: (repeatPassword) => set({ repeatPassword})
}));