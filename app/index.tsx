import { View, StatusBar } from "react-native";
import LgLink from "@/components/Links/lgLink";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar barStyle="light-content" backgroundColor="#0155B6" />

      <LgLink title="دکمه آزمایشی" target={"/welcome"} even />
    </View>
  );
}
