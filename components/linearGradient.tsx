import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

const CustomLinearGradient = () => (
  <LinearGradient
    colors={["rgba(0, 121, 177, 0.3)", "white"]}
    style={{
      position: "absolute",
      zIndex: -1,
      left: 0,
      right: 0,
      top: 0,
      minHeight: Dimensions.get("window").height,
    }}
  />
);
export default CustomLinearGradient;
