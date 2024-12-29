import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

const CustomLinearGradient = () => (
  <LinearGradient
    colors={["rgba(4, 175, 243, 0.29)", "white"]}
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
