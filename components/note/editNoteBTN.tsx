import { lightTheme } from "@/constants/theme";
import { TouchableOpacity } from "react-native";
import useTheme from "@/context/themeProvider";
import useSubmitNoteType from "@/context/submitNoteTypeProvider";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const EditNoteBTN = () => {
  const { theme } = useTheme();
  const { submitAction } = useSubmitNoteType();
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={submitAction}>
      <FontAwesome6
        name="edit"
        size={22}
        color={theme === "light" ? lightTheme.primary : "white"}
      />
    </TouchableOpacity>
  );
};

export default EditNoteBTN;
