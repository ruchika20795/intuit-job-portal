import React, { createContext, useState, useEffect } from "react";
import { Theme } from "../utils/constants";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Load theme from localStorage or default to 'light'
    return localStorage.getItem("theme") || Theme.Light;
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
