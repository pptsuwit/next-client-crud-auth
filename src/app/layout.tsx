import "./globals.css";

import type { Metadata } from "next";
import Providers from "./providers";
import { GlobalContextProvider } from "@/context/store";
// import { Roboto } from "next/font/google";
// const roboto = Roboto({
//   weight: "400",
//   subsets: ["latin"],
//   display: "swap",
// });
// import ThemeSwitcher from "@/components/ThemeSwitcher";
export const metadata: Metadata = {
  title: "x",
  description: "x",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body suppressHydrationWarning={true}> */}
      <body>
        <GlobalContextProvider>
          <Providers>{children}</Providers>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
