import { Image, View } from "react-native";
import CustomeLink from "@/components/customLink";
import ShortTitle from "@/components/shortTitle";

// auth screen
export default function Index() {
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

      <ShortTitle size={21} title="ثبت نام یا ورود را انتخاب کنید" />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <CustomeLink title="ثبت نام" target={"/register"} />
        <CustomeLink title="ورود" target={"/login"} />
        <CustomeLink
          title="ورود آفلاین"
          target={"/registerOffline"}
          even={false}
        />
      </View>
    </View>
  );
}
