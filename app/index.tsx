import { useContext, useEffect } from "react";
import Loading from "@/components/common/Loading";
import { authContext } from "@/context/authProvider";
import { View, StyleSheet } from "react-native";
import CustomeLink from "@/components/common/LinkButton";
import { Image } from "expo-image";
import Logo from "@/components/common/Logo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import BoldTitle from "@/components/common/BoldTitle";
import Toast from "react-native-toast-message";

// welcome screen
export default function index() {
  const { loading, setLoading } = useContext(authContext);

  const router = useRouter();

  useEffect(() => {
    const setAppMode = async () => {
      const mode = await AsyncStorage.getItem("defaultMode");

      if (mode) {
        router.replace("/(home)");
      } else {
        setLoading(false);
      }
    };
    setAppMode();
  }, []);

  const showToast = () => {
    Toast.show({
      type: "success",
      text2: "با موفقیت وارد شدید",
    });
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View style={styles.container}>
        <Logo />
        <BoldTitle title="به مایک نت خوش اومدی!" />
        <Image
          source={require("@/assets/images/welcome.png")}
          style={styles.welcomeImg}
          contentFit="contain"
        />

        <CustomeLink title="شروع!" target="/(auth)" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  welcomeImg: {
    width: 250,
    height: 150,
  },
});
