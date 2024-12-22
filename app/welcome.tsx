import { Text, View, Image, StyleSheet } from "react-native";
import LgLink from "@/components/Links/lgLink";

// welcome screen

export default function Welcome() {
  return (
    <View style={styles.container}>
      {/* logo */}
      <Image source={require("@/assets/images/logo.png")} style={styles.img} />

      {/* welcome text */}
      <Text style={styles.welcomeMessage}>
        به اپلیکیشن یادداشت برداری خوش اومدی! برای اینکه با قابلیت های این
        برنامه آشنا بشی و باهاشون کار کنی، فقط کافیه رو دکمه شروع کلیک کنی!
      </Text>
      {/* welcome img */}
      <Image
        source={require("@/assets/images/welcome.png")}
        style={styles.img}
      />
      {/*  start btn */}
      <LgLink title="شروع" target="(auth)" even />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  img: {
    objectFit: "contain",
  },
  welcomeMessage: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Yekan",
    width: "90%",
    color: "black",
  },
});
