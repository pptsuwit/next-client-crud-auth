import type { Metadata } from "next";
import { Layouts } from "@/components/common/Layouts";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication",
};

export default function AuthLayouts({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Layouts.Auth>{children}</Layouts.Auth>
    </>
  );
}
