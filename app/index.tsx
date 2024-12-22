import { View, StatusBar } from "react-native";
import CustomeLink from "@/components/customLink";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar barStyle="light-content" backgroundColor="#0155B6" />

      <CustomeLink title="دکمه آزمایشی" target={"/welcome"} />
    </View>
  );
}
