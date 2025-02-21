import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native";

const SubmitNoteButton = () => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <FontAwesome5 name="plus" size={20} color="white" />
    </TouchableOpacity>
  );
};

export default SubmitNoteButton;
