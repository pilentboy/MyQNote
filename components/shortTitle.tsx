import { lightTheme } from "@/constants/theme";
import { Text } from "react-native";

const ShortTitle = ({ title, size = 25 }: { title: string; size?: number }) => {
  return (
    <Text
      style={{
        textAlign: "center",
        fontSize: size,
        fontFamily: "Yekan",
        fontWeight: "bold",
        width: "90%",
        color: lightTheme.primaryColor,
      }}
    >
      {title}
    </Text>
  );
};

export default ShortTitle;
