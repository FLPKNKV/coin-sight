import { z } from "zod";

export const phoneValidationSchema = z.object({
    phoneNumber: z
        .string()
        .min(10, "Phone number needs to be valid")
        .max(14, "Phone number needs to be valid"),
});