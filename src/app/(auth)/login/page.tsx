"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { loginSchema } from "@/zodSchema/loginSchema";
import { authService } from "@/services/auth.service";
import { getModalMessage } from "@/utils/helpers";
import { useGlobalContext } from "@/context/store";
type FormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const { setModal, setModalMessage } = useGlobalContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });
  useEffect(() => {
    reset({ email: "test@test.com", password: "test1234" });
  }, []);
  async function onSubmit(data: FormData) {
    await authService
      .login(data.email, data.password)
      .then(async (item: ILoginResponse) => {
        const { token } = item.data;
        if (token) {
          localStorage.setItem(process.env.TOKEN_NAME as string, token);
          router.refresh();
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        setModal(true);
        setModalMessage(getModalMessage("error", err));
      });
  }
  return (
    <>
      <div className="light:bg-slate-300 dark:bg-none flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md shadow-slate-300 w-full sm:w-96">
          <h1 className="text-4xl text-center text-[#6E4895] font-semibold mb-6">LOGIN</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2">Email</label>
              <TextField
                InputProps={{
                  className: "dark:text-black ",
                }}
                className="dark:bg-slate-200 dark:rounded-md"
                {...register("email", { required: true })}
                id="email"
                type="email"
                variant="outlined"
                size="small"
                fullWidth
              />
              {errors?.email && <p className="text-red-600 text-sm">{errors?.email?.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2">Password</label>

              <TextField
                InputProps={{
                  className: "dark:text-black ",
                }}
                className="dark:bg-slate-200 dark:rounded-md"
                {...register("password", { required: true })}
                id="password"
                type="password"
                variant="outlined"
                size="small"
                fullWidth
                // inputProps={{
                //   autoComplete: "new-password",
                // }}
              />
              {errors?.password && <p className="text-red-600 text-sm">{errors?.password?.message}</p>}
            </div>
            <div className="mb-4">
              <Button variant="contained" fullWidth className="text-xl font-bold" type="submit">
                Login
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 font-bold">
              Don't have an account?{" "}
              <Link href="/register" className="text-indigo-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
