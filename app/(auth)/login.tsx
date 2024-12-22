import { View, } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const Login = () => {
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
  
      <MaterialCommunityIcons name="login" size={50} color="black" />
    </View>
  );
};
export default Login;
