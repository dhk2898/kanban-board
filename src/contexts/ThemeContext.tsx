import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark"

interface ThemeContextType{
 theme: Theme;
 toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({children}: {children: React.ReactNode})
{
 const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "light");

 useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
 }, [theme])

 const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
 
 return(
  <ThemeContext.Provider value = {{theme, toggle}}>
   {children}
  </ThemeContext.Provider>
 )
}

export function useTheme(){
 const ctx = useContext(ThemeContext);
 if (!ctx) throw new Error("use Theme must be inside theme provider");
 return ctx;
}