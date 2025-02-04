import { useContext, useEffect } from "react";
import Loading from "@/components/loading";
import { authContext } from "@/context/authProvider";
import { View, StyleSheet } from "react-native";
import CustomeLink from "@/components/customLink";
import { Image } from "expo-image";
import Logo from "@/components/logo";
import ShortTitle from "@/components/shortTitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

// welcome screen
export default function index() {
  const { loading, setLoading } = useContext(authContext);

  const router = useRouter();

  useEffect(() => {
    const setAppMode = async () => {
      const mode = await AsyncStorage.getItem("defaultMode");

      if (mode) {
        router.navigate("/(home)");
      } else {
        setLoading(false);
      }
    };
    setAppMode();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View style={styles.container}>
        <Logo />
        <ShortTitle title="به مایک نت خوش اومدی!" />
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
