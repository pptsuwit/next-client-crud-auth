import { ThemeProvider as PreferredThemeProvider } from "next-themes";
import { FC } from "react";
import MUIThemeProvider from "./MUIThemeProvider";

// Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();

interface PageProviderProps {
  children: React.ReactNode;
}

const PageProvider: FC<PageProviderProps> = ({ children }) => (
  <PreferredThemeProvider attribute="class">
    <MUIThemeProvider>{children}</MUIThemeProvider>
  </PreferredThemeProvider>
);

export default PageProvider;
