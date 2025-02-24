import useTheme from "@/context/themeProvider";
import { Stack } from "expo-router";
import { View } from "react-native";
import SubmitNoteButton from "@/components/note/submitNoteBTN";
import useSubmitNoteType from "@/context/submitNoteTypeProvider";
import EditNoteBTN from "@/components/note/editNoteBTN";
import DeleteNoteBTN from "@/components/note/deleteNoteBTN";


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
                  <DeleteNoteBTN />
                  <EditNoteBTN />
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
