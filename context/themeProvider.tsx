import { lightTheme } from "@/constants/theme";
import { handleGetAppTheme } from "@/utils/handleLocalStorage";
import { createContext, useContext, useEffect, useState } from "react";
import { StatusBar } from "react-native";

const themeContext = createContext<{
  theme: any;
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
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme === "light" ? lightTheme.primary : "#222831"}
      />
      {children}
    </themeContext.Provider>
  );
};

const useTheme = () => useContext(themeContext);

export default useTheme;

export { ThemeProvider };
