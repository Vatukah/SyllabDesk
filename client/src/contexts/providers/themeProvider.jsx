import {themeContext} from "../allContexts.js";
import { useContext, useLayoutEffect, useState } from "react";

export default function ThemeProvider({children}) {
  const default_theme = "light";
  const [choosenTheme, setChoosenTheme] = useState(default_theme);

  const setTheme = (theme) => {
    window.localStorage.setItem("theme", theme);
    document.documentElement.dataset.colorMode = theme;

    setChoosenTheme(theme);
  };
  const set_to_dark = (e) => {
    e.stopPropagation();
    setTheme("dark");
  };
  const set_to_light = (e) => {
    e.stopPropagation();
    setTheme("light");
  };


useLayoutEffect(() => {
  const userTheme = window.localStorage.getItem("theme");
  setTheme(userTheme || default_theme);
}, []);

  return (
    <themeContext.Provider
      value={{ choosenTheme, set_to_dark, set_to_light }}
    >
        {children}
    </themeContext.Provider>
  );
}

export const  useTheme = () => useContext(themeContext);