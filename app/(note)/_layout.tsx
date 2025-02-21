import useTheme from "@/context/themeProvider";
import { Stack } from "expo-router";
import { View } from "react-native";
import SubmitNoteButton from "@/components/note/submitNoteBTN";
import useSubmitNoteType from "@/context/submitNoteType";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { lightTheme } from "@/constants/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export default function NoteLayout() {
  const { theme } = useTheme();
  const { submitNoteType } = useSubmitNoteType();

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
            <View style={{ flexDirection: "row", gap: 15 }}>
              {submitNoteType === "newNote" ? (
                <SubmitNoteButton />
              ) : (
                <>
                  <FontAwesome name="remove" size={24} color="red" />
                  <FontAwesome6
                    name="edit"
                    size={22}
                    color={theme === "light" ? lightTheme.primary : "white"}
                  />
                </>
              )}
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
