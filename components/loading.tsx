import { darkTheme, lightTheme } from "@/constants/theme";
import useTheme from "@/context/themeProvider";
import { View } from "react-native";
import { WaveIndicator } from "react-native-indicators";

const Loading = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        backgroundColor: theme === "light" ? "white" : darkTheme.primary,
      }}
    >
      <WaveIndicator count={3} color={lightTheme.primary} animating={true} />
    </View>
  );
};

export default Loading;
