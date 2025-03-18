import { z } from "zod";

export const userDetailValidationSchema = z.object({
    firstName: z.string().min(2, "Please enter a first name longer than 2 characters").regex(/^[a-zA-Z\s]*$/, "First name should not contain special characters or numbers"),
    lastName: z.string().min(2, "Please enter a first name longer than 2 characters").regex(/^[a-zA-Z\s]*$/, "Last name should not contain special characters or numbers"),
    emailAddress: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
})
.refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
});