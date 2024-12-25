import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { lightTheme } from "@/constants/theme";

const AddNoteBTN = ({ action }: { action: () => void }) => {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        bottom: 26,
        left: "76%",
        boxShadow: "0 0 5px #0155B6",
        zIndex: 150,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: lightTheme.primaryColor,
        borderRadius: 50,
        padding: 10,
        width: 60,
        height: 60,
      }}
      onPress={action}
    >
      <Ionicons name="add" size={40} color="white" />
    </TouchableOpacity>
  );
};
export default AddNoteBTN;
