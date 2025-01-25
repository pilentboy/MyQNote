import useTheme from "@/context/themeProvider";
import { Text } from "react-native";

// date and time wraper
const FooterText = ({ value }: { value: string }) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        color: theme === "light" ? "black" : "white",
        fontWeight: "bold",
        fontSize: 11,
        fontFamily: "Vazir",
      }}
    >
      {value}
    </Text>
  );
};

export default FooterText;
