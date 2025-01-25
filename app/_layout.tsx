import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "../context/authProvider";
import { StatusBar } from "react-native";
import { lightTheme } from "@/constants/theme";
import { ThemeProvider } from "@/context/themeProvider";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Yekan: require("../assets/fonts/YekanBakh-Regular.ttf"),
    Vazir: require("../assets/fonts/Vazir.ttf"),
  });

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplashScreen();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor={lightTheme.primaryColor}
          />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
        </SafeAreaProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
