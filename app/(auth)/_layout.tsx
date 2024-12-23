import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{ headerTitle: "ثبت نام", headerShown: true }}
      />
      <Stack.Screen
        name="login"
        options={{ headerTitle: "ورود", headerShown: true }}
      />
      <Stack.Screen
        name="registerOffline"
        options={{ headerTitle: "ورود آفلاین", headerShown: true }}
      />
    </Stack>
  );
}
