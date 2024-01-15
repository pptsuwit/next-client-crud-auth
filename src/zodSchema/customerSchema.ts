import { z } from "zod";

export const schema = z.object({
  email: z.string().nonempty("Email is required").email({ message: "Invalid email address" }),
  firstName: z.string().nonempty("FirstName is required").regex(new RegExp("^[a-zA-Z]+$"), "Only letters a-z are allowed"),
  lastName: z.string().nonempty("Lastname is required").regex(new RegExp("^[a-zA-Z]+$"), "Only letters a-z are allowed"),
  address: z.string().nonempty("Address is required"),
  birthdate: z.string().nullable(),
  phone: z
    .string()
    .nonempty("Phone is required")
    .min(9, { message: "Must be 9 to 10 digits" })
    .max(10, { message: "Must be 9 to 10 digits" })
    .regex(new RegExp(".*[0-9].*"), "Only nummber are allowed"),
});
