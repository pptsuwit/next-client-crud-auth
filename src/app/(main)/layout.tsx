import type { Metadata } from "next";
import { Layouts } from "@/components/common/Layouts";
export const metadata: Metadata = {
  title: "Main Content",
  description: "description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Layouts.Main>{children}</Layouts.Main>;
}
