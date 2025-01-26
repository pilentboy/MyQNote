import useTheme from "@/context/themeProvider";
import { Text } from "react-native";
const FormTitle = ({ title }: { title: string }) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        fontFamily: "Vazir",
        fontSize: 21,
        paddingTop: 70,
        color: theme === "light" ? "black" : "white",
      }}
    >
      {title}
    </Text>
  );
};

export default FormTitle;
