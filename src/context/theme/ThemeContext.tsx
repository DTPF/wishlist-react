import { createContext } from "react";
import { UpdateCurrentThemeContextType, initialThemeState } from "./initialThemeState";
const ThemeContext = createContext<UpdateCurrentThemeContextType>(initialThemeState);

export default ThemeContext;