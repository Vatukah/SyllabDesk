import { createContext,useContext } from "react";

const themeContext = createContext();
const useTheme =()=> useContext(themeContext);

export { themeContext as default,useTheme };
