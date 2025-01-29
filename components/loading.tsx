import { lightTheme } from "@/constants/theme";
import { View } from "react-native";
import { WaveIndicator } from "react-native-indicators";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      {/* <WaveIndicator count={3} color={lightTheme.primary} animating={true} /> */}
    </View>
  );
};

export default Loading;
