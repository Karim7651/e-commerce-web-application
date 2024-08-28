'use client'
import useTheme from "../hooks/useTheme";
export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
  
    return (
      <nav>
        <button onClick={toggleTheme}>
          theme
        </button>
      </nav>
    );
  }
  