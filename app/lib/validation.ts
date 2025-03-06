import { z } from "zod";

export const nameValidationSchema = z.object({
    firstName: z.string().min(2, "Please enter a first name").regex(/^[a-zA-Z\s]*$/, "First name should not contain special characters or numbers"),
    lastName: z.string().min(2, "Please enter a last name").regex(/^[a-zA-Z\s]*$/, "Last name should not contain special characters or numbers"),
})

export const phoneValidationSchema = z.object({
    phoneNumber: z
        .string()
        .min(10, "Phone number needs to be valid")
        .max(14, "Phone number needs to be valid"),
});

