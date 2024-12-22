import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
const registerOffline = () => {
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Ionicons name="cloud-offline" size={50} color="black" />
    </View>
  );
};
export default registerOffline;
