import { View } from "react-native";
import CustomeLink from "@/components/customLink";
import ShortTitle from "@/components/shortTitle";
import Logo from "@/components/logo";
import CustomLinearGradient from "@/components/linearGradient";

export default function index() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Logo />
      <CustomLinearGradient />

      <ShortTitle size={21} title="ثبت نام یا ورود را انتخاب کنید" />

      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <CustomeLink title="ثبت نام" target={"/(auth)/register"} />
        <CustomeLink title="ورود" target={"/(auth)/login"} />
        <CustomeLink title="ورود آفلاین" target={"/(home)/"} bgColor={false} />
      </View>
    </View>
  );
}
