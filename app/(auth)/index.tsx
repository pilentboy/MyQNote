import { Image, View } from "react-native";
import LgLink from "@/components/Links/lgLink";
import { useNavigation } from "expo-router";
// login screen

export default function Index() {
  const navigate = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Image source={require("@/assets/images/logo.png")} />

      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <LgLink title="ثبت نام" target={"/"} even />
        <LgLink title="ورود" target={"/"} even />
        <LgLink title="ورود آفلاین" target={"../"} even={false} />
      </View>
    </View>
  );
}
