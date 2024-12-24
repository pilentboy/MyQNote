import { View } from "react-native";
import CustomeLink from "@/components/customLink";
import ShortTitle from "@/components/shortTitle";
import Logo from "@/components/logo";
// auth screen
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
        <CustomeLink title="ورود" target={"/(home)"} />
        <CustomeLink title="ورود آفلاین" target={"/(home)"} bgColor={false} />
      </View>
    </View>
  );
}
