import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { lightTheme } from "@/constants/theme";


const AddNoteBTN = ({
  action,
  display,
}: {
  action: () => void;
  display: boolean;
}) => {
  return (
    <TouchableOpacity
      style={{
        opacity: display ? 1 : 0,
        position: "absolute",
        bottom: 26,
        right: "5%",
        boxShadow: "0 0 5px #0155B6",
        zIndex: 150,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: lightTheme.primary,
        borderRadius: 50,
        padding: 10,
        width: 60,
        height: 60,
        transitionDuration: "500ms",
      }}
      onPress={action}
      activeOpacity={0.8}
    >
      <Ionicons name="add" size={40} color="white" />
    </TouchableOpacity>
  );
};
export default AddNoteBTN;
