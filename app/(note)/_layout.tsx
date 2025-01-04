import { Stack } from "expo-router";

export default function NoteLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{
        title:"نوشتن"
      }} />
    </Stack>
  );
}
