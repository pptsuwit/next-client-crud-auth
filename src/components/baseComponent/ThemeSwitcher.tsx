"use client";
import { useTheme } from "next-themes";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useEffect, useState } from "react";
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);
  function changeMode() {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }
  return (
    <>
      {loaded ? (
        <>
          <IconButton sx={{ ml: 1 }} onClick={changeMode} color="inherit" className="font-bold">
            {theme === "light" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <span onClick={changeMode} className="font-bold">
            {theme}
          </span>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default ThemeSwitcher;
