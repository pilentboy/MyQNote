import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "../context/authProvider";
import { StatusBar } from "react-native";
import { lightTheme } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Yekan: require("../assets/fonts/YekanBakh-Regular.ttf"),
    Vazir: require("../assets/fonts/Vazir.ttf"),
  });

  const x = async () => {
    await AsyncStorage.removeItem("notes");
  };
  useEffect(() => {
    async function hideSplashScreen() {
      x();

      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplashScreen();
  }, []);

  return (
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
  );
}
