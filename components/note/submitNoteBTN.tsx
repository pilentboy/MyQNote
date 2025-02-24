import { lightTheme } from "@/constants/theme";
import { TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useTheme from "@/context/themeProvider";
import useSubmitNoteType from "@/context/submitNoteTypeProvider";

const SubmitNoteButton = () => {
  const { theme } = useTheme();
  const { submitAction } = useSubmitNoteType();

  
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={submitAction}>
      <FontAwesome
        name="plus"
        size={23}
        color={theme === "light" ? lightTheme.primary : "white"}
      />
    </TouchableOpacity>
  );
};

export default SubmitNoteButton;
