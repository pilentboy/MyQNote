import { Text } from "react-native";
import useTheme from "@/context/themeProvider";
const BottomGuideText = ({ title }: { title: string }) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        fontFamily: "Vazir",
        fontSize: 14,
        color: theme === "light" ? "black" : "white",
      }}
    >
      {title}
    </Text>
  );
};

export default BottomGuideText;
