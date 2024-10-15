import React, { createContext, useState, useEffect } from "react";
import { Theme } from "../utils/constants";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: Theme.Light,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps>  = ({children}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Load theme from localStorage or default to 'light'
    return (localStorage.getItem("theme") as Theme) || Theme.Light;
  });

  // Toggle between 'light' and 'dark' themes
  const toggleTheme = () => {
    const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Persist theme in localStorage
  };

  useEffect(() => {
    // Apply the theme to the root element (body)
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
