import { View, StyleSheet } from "react-native";
import LinkButton from "@/components/common/LinkButton";
import BoldTitle from "@/components/common/BoldTitle";
import { CroppedLogo } from "@/components/logo";
import CustomLinearGradient from "@/components/linearGradient";
import { useContext, useEffect } from "react";
import {
  handleDefaultNoteMode,
  handleRemoveAccessKey,
} from "@/utils/handleLocalStorage";
import { authContext } from "@/context/authProvider";

export default function index() {
  const { setAccessKey, setAppMode, setUserNotes } = useContext(authContext);

  useEffect(() => {
    const init = async () => {
      await handleRemoveAccessKey();
      await handleDefaultNoteMode("offline");
      setAccessKey(null);
      setAppMode("offline");
      setUserNotes([]);
    };

    init();
  }, []);

  return (
    <View style={styles.container}>
      <CroppedLogo />
      <CustomLinearGradient />

      <BoldTitle size={21} title="لطفا یک گزینه را برای ورود انتخاب کنید" />

      <View style={styles.linkWrapper}>
        <LinkButton title="ثبت نام" target={"/(auth)/register"} />
        <LinkButton title="ورود" target={"/(auth)/login"} />
        <LinkButton title="ورود آفلاین" target={"/(home)/"} bgColor={false} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },

  linkWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
