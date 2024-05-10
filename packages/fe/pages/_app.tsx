import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ThemeContext } from ".";

export default function App({ Component, pageProps }: AppProps) {
  const [isDark, setDark] = useState(false);

  const toggleDarkMode = () => {
    setDark(!isDark);
  };
  
  return (
    <ThemeContext.Provider value={{ darkMode: isDark, toggleDarkMode }}>
      <div className={isDark ? 'dark' : ''}>
        <Component {...pageProps} />
      </div>
    </ThemeContext.Provider>
  );
}
