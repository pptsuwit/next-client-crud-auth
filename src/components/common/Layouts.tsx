import AuthLayout from "./authLayout/Layout";
import MainLayout from "./mainLayout/Layout";

export const Layouts = {
  Main: MainLayout,
  Auth: AuthLayout,
};

export type LayoutKeys = keyof typeof Layouts;
