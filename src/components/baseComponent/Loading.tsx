"use client";
import { Backdrop, CircularProgress } from "@mui/material";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Loading() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    // const router = useRouter();
    // localStorage.getItem(process.env.TOKEN_NAME as string) ? null : router.push("/login");
    setOpen(true);
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <>
      <Backdrop open={open} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
