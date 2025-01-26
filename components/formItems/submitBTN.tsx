import { TouchableOpacity, Text } from "react-native";
import { lightTheme } from "@/constants/theme";
const SubmitBTN = ({ action, title }: { action: any; title: string }) => (
  <TouchableOpacity
    style={{
      width: 300,
      height: 45,
      borderWidth: 0,
      borderRadius: 15,
      backgroundColor: lightTheme.primary,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    onPress={action}
    activeOpacity={0.8}
  >
    <Text
      style={{
        color: "white",
        fontFamily: "Yekan",
        fontSize: 18,
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

export default SubmitBTN;
