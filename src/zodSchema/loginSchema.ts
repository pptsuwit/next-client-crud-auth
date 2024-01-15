import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email({ message: "Invalid email address" }),
  password: z.string().nonempty("Password is required").min(6, { message: "Must be 6 or more characters long" }),

  // .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
  // .regex(new RegExp(".*[a-z].*"), "One lowercase character"),
  // .regex(new RegExp(".*\\d.*"), "One number")
  // .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"ฟ), "One special character")
  // .min(8, "Must be at least 8 characters in length"),
});
