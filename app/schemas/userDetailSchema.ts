import { z } from "zod";

export const userDetailValidationSchema = z
  .object({
    firstName: z.string().min(2, "Please enter a first name longer than 2 characters").regex(/^[a-zA-Z\s]*$/, "First name should not contain special characters or numbers"),
    lastName: z.string().min(2, "Please enter a last name longer than 2 characters").regex(/^[a-zA-Z\s]*$/, "Last name should not contain special characters or numbers"),
    emailAddress: z.string().email("Please enter a valid email address"),
  });

export const userPasswordValidationSchema = z
  .object({
    password: z.string().min(8, "Password should be at least 8 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Password should contain at least one uppercase letter, one lowercase letter and one number"),
    repeatPassword: z.string().min(8, "Password should be at least 8 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Password should contain at least one uppercase letter, one lowercase letter and one number"),
  }).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });
