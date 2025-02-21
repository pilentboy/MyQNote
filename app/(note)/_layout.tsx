import useTheme from "@/context/themeProvider";
import { Stack } from "expo-router";
import { View } from "react-native";
import SubmitNoteButton from "@/components/note/submitNoteBTN";

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
        headerRight: () => {
          return (
            <View>
              <SubmitNoteButton />
            </View>
          );
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "نوشتن",
          headerTitle: "",
        }}
      />
    </Stack>
  );
}
