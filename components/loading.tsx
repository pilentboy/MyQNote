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
      }}
    >
      <WaveIndicator
        count={3}
        color={lightTheme.primaryColor}
        animating={true}
      />
    </View>
  );
};

export default Loading;
