import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";

export default function Layout() {

  const font = useFonts({
    Yekan: require("../assets/fonts/YekanBakh-Regular.ttf"),
  });

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "خونه" }} />
    </Stack>
  );
}
