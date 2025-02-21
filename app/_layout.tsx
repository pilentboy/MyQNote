import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "../context/authProvider";
import { ThemeProvider } from "@/context/themeProvider";
import Toast, { BaseToast } from "react-native-toast-message";
import { EditProvider } from "@/context/editProvider";
import { SubmitNoteTypeProvider } from "@/context/submitNoteType";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text2Style={{
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "Yekan",
        textAlign: "center",
      }}
    />
  ),
  error: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "red" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text2Style={{
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "Yekan",
        textAlign: "center",
      }}
    />
  ),
};

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
      <SubmitNoteTypeProvider>
        <EditProvider>
          <AuthProvider>
            <SafeAreaProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
              </Stack>
            </SafeAreaProvider>
          </AuthProvider>
          <Toast config={toastConfig} />
        </EditProvider>
      </SubmitNoteTypeProvider>
    </ThemeProvider>
  );
}
