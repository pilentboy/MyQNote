import { lightTheme } from "@/constants/theme";
import { TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useTheme from "@/context/themeProvider";

const SubmitNoteButton = () => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <FontAwesome
        name="plus"
        size={23}
        color={theme === "light" ? lightTheme.primary : "white"}
      />
    </TouchableOpacity>
  );
};

export default SubmitNoteButton;
