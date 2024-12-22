import { View, StatusBar } from "react-native";
import { lightTheme } from "@/constants/theme";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar barStyle="light-content" backgroundColor="#0155B6" />

      <Link
        href={"/welcome"}
        style={{
          width: 300,
          height: 50,
          backgroundColor: lightTheme.primaryColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10,
          borderRadius: 10,
          color: "white",
          fontSize: 20,
          fontFamily: "Yekan",
          textAlign: "center",
        }}
      >
        دکمه آزمایشی
      </Link>
    </View>
  );
}
