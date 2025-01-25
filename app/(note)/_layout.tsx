import useTheme from "@/context/themeProvider";
import { Stack } from "expo-router";

export default function NoteLayout() {
  const { theme } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme === "light" ? "white" : "#222831",
        },
        headerTintColor: theme === "light" ? "black" : "white",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "نوشتن",
        }}
      />
    </Stack>
  );
}
