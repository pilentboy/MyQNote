import { View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
const Register = () => {
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
      <FontAwesome5 name="user-plus" size={30} color="black" />
    </View>
  );
};
export default Register;
