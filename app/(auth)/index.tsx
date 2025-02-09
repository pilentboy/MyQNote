import { View } from "react-native";
import CustomeLink from "@/components/customLink";
import BoldTitle from "@/components/boldTitle";
import { CroppedLogo } from "@/components/logo";
import CustomLinearGradient from "@/components/linearGradient";
import { useContext, useEffect } from "react";
import {
  handleDefaultNoteMode,
  handleRemoveAccessKey,
} from "@/utils/handleLocalStorage";
import { authContext } from "@/context/authProvider";
export default function index() {
  const { setAccessKey, setAppMode } = useContext(authContext);

  useEffect(() => {
    const init = async () => {
      await handleRemoveAccessKey();
      await handleDefaultNoteMode("offline");
      setAccessKey(null);
      setAppMode("offline");
    };

    init();
    console.log("auth page mounted");
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <CroppedLogo />
      <CustomLinearGradient />

      <BoldTitle size={21} title="لطفا یک گزینه را برای ورود انتخاب کنید" />

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
