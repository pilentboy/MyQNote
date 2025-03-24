import useTheme from "@/context/themeProvider";
import { Stack } from "expo-router";
import { View, Text } from "react-native";
import SubmitNoteButton from "@/components/note/submitNoteBTN";
import useSubmitNoteType from "@/context/submitNoteTypeProvider";
import EditNoteBTN from "@/components/note/editNoteBTN";
import DeleteNoteBTN from "@/components/note/deleteNoteBTN";
import { useContext, useEffect } from "react";
import { authContext } from "@/context/authProvider";

export default function NoteLayout() {
  const { theme } = useTheme();
  const { submitNoteType } = useSubmitNoteType();
  const { sharedNoteUsername } = useContext(authContext);

  useEffect(() => {
    console.log(sharedNoteUsername,'xx');
  }, [sharedNoteUsername]);
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme === "light" ? "white" : "#222831",
        },
        headerTintColor: theme === "light" ? "black" : "white",
        headerRight: () => {
          if (!!sharedNoteUsername)
            return <Text style={{ fontSize: 15,color:'white' }}>{sharedNoteUsername}</Text>;
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
