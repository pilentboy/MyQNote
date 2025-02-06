import { Text } from "react-native";
import useTheme from "@/context/themeProvider";

const FormInputLabel = ({ label }: { label: string }) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        fontSize: 14,
        color: theme === "light" ? "#2A3335" : "white",
        fontFamily: "Yekan",
        fontWeight: "bold",
        
      }}
    >
      {label}
    </Text>
  );
};

export default FormInputLabel