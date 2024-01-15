"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/baseComponent/Loading";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    localStorage.getItem(process.env.TOKEN_NAME as string) ? router.push("/dashboard") : router.push("/login");
  }, []);

  return (
    <>
      <Loading />
    </>
  );
}
