import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  const font = useFonts({
    Yekan: require("../assets/fonts/YekanBakh-Regular.ttf"),
  });

  return (
    <Stack>
      <SafeAreaProvider>
        <SafeAreaView>
          <Stack.Screen
            name="index"
          />
          <Stack.Screen name="start" options={{ title: "شروع" }} />
        </SafeAreaView>
      </SafeAreaProvider>
    </Stack>
  );
}
