import { useTheme } from "./ThemeContext";

function ThemeToggle()
{
 const {theme, toggle} = useTheme();

 return(
  <button onClick = {toggle} className = 'header-bar'>
   {theme === "light" ? "Dark Mode" : "Light Mode"}
  </button>
 )
}

export default ThemeToggle