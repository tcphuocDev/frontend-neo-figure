import { useState, useEffect } from 'react';
import { ThemeContext } from './themeContext.js';

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    // Add no-transition class temporarily to prevent jarring transitions
    document.documentElement.classList.add('no-transition');
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // Remove no-transition class after a brief delay
    setTimeout(() => {
      document.documentElement.classList.remove('no-transition');
    }, 50);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
};
