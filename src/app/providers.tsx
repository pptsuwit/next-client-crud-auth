"use client";
import { useGlobalContext } from "@/context/store";
import Modal from "@/components/baseComponent/Modal";
import PageProvider from "@/components/helpers/PageProvider";
// import { ThemeProvider } from "next-themes";

// // import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { createTheme } from "@mui/material/styles";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { modal, setModal, modalMessage } = useGlobalContext();
  if (localStorage.getItem("theme") !== "dark") {
    localStorage.setItem("theme", "light");
  }
  return (
    <PageProvider>
      <Modal open={modal} handleClose={() => setModal(false)} body={modalMessage}></Modal>
      {children}
    </PageProvider>
  );
  // return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
