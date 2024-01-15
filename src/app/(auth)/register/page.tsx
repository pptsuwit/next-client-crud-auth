"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { registerSchema } from "@/zodSchema/registerSchema";
import { authService } from "@/services/auth.service";
import { getModalMessage } from "@/utils/helpers";
import { useGlobalContext } from "@/context/store";
type FormData = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const { setModal, setModalMessage } = useGlobalContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });
  useEffect(() => {
    reset({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  }, []);
  async function onSubmit(data: FormData) {
    await authService
      .register(data.email, data.password, data.firstName, data.lastName)
      .then(async (item: IUser) => {
        const { token } = item;
        localStorage.setItem(process.env.TOKEN_NAME as string, token);
        router.push("/login");
      })
      .catch((err) => {
        setModal(true);
        setModalMessage(getModalMessage("error", err));
      });
  }
  return (
    <>
      <div className="light:bg-slate-100 dark:bg-none flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-96">
          <h1 className="text-4xl text-center text-[#6E4895] font-semibold mb-6">REGISTER</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2">Email</label>
              <TextField {...register("email", { required: true })} id="email" type="email" variant="outlined" size="small" fullWidth />
              {errors?.email && <p className="text-red-600 text-sm">{errors?.email?.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2">First Name</label>
              <TextField {...register("firstName", { required: true })} variant="outlined" size="small" fullWidth />
              {errors?.firstName && <p className="text-red-600 text-sm">{errors?.firstName?.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2">Last Name</label>
              <TextField {...register("lastName", { required: true })} variant="outlined" size="small" fullWidth />
              {errors?.lastName && <p className="text-red-600 text-sm">{errors?.lastName?.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2">Password</label>
              <TextField {...register("password", { required: true })} id="password" type="password" variant="outlined" size="small" fullWidth />
              {errors?.password && <p className="text-red-600 text-sm">{errors?.password?.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2">Confirm Password</label>
              <TextField {...register("confirmPassword", { required: true })} id="confirmPassword" type="password" variant="outlined" size="small" fullWidth />
              {errors?.confirmPassword && <p className="text-red-600 text-sm">{errors?.confirmPassword?.message}</p>}
            </div>
            <div className="mb-4">
              <Button variant="contained" fullWidth className="text-xl font-bold" type="submit">
                Register
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 font-bold">
              Back to{" "}
              <Link href="/login" className="text-indigo-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
