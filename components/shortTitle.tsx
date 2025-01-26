import { lightTheme } from "@/constants/theme";
import useTheme from "@/context/themeProvider";
import { Text } from "react-native";

const ShortTitle = ({ title, size = 25 }: { title: string; size?: number }) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        textAlign: "center",
        fontSize: size,
        fontFamily: "Yekan",
        fontWeight: "bold",
        width: "90%",
        color: theme === "light" ? lightTheme.primaryColor : "white",
      }}
    >
      {title}
    </Text>
  );
};

export default ShortTitle;
