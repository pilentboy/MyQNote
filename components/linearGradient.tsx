import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import useTheme from "@/context/themeProvider";
import { darkTheme } from "@/constants/theme";
const CustomLinearGradient = () => {
  const { theme } = useTheme();

  const linearColors: {
    light: [string, string];
    dark: [string, string];
  } = {
    light: ["rgba(0, 121, 177, 0.3)", "white"],
    dark: [darkTheme.secondry, darkTheme.primary],
  };

  return (
    <LinearGradient
      colors={theme === "light" ? linearColors.light : linearColors.dark}
      style={{
        position: "absolute",
        zIndex: -1,
        left: 0,
        right: 0,
        top: 0,
        minHeight: Dimensions.get("window").height,
      }}
    />
  );
};

export default CustomLinearGradient;
