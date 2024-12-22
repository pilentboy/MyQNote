import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { lightTheme } from "@/constants/theme";

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
      <TouchableOpacity style={styles.startBTN}>
        <Text style={{ color: "white", fontSize: 20, fontFamily: "Yekan" }}>
          شروع
        </Text>
      </TouchableOpacity>
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
  startBTN: {
    width: 300,
    height: 50,
    backgroundColor: lightTheme.primaryColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
