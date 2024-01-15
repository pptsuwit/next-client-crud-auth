import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().nonempty("Email is required").email({ message: "Invalid email address" }),
    firstName: z.string().nonempty("FirstName is required").regex(new RegExp(".*[A-Za-z].*"), "Only letters (a-z) are allowed"),
    lastName: z.string().nonempty("Lastname is required").regex(new RegExp(".*[A-Za-z].*"), "Only letters (a-z) are allowed"),
    password: z.string().nonempty("Password is required").min(6, { message: "Must be 6 or more characters long" }),
    confirmPassword: z.string().nonempty("Password is required").min(6, { message: "Must be 6 or more characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });
