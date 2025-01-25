import { handleGetAppTheme } from "@/utils/handleLocalStorage";
import { createContext, useContext, useEffect, useState } from "react";

const themeContext = createContext<{
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<any>>;
}>({
  theme: "light",
  setTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<any>();

  useEffect(() => {
    const getTheme = async () => {
      setTheme(await handleGetAppTheme());
    };
    getTheme();
  }, []);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
};

const useTheme = () => useContext(themeContext);

export default useTheme;

export { ThemeProvider };
