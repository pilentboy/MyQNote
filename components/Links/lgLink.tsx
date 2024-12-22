import { lightTheme } from "@/constants/theme";
import { ExternalPathString, Link } from "expo-router";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
type Link = {
  title: string;
  target: any;
  even: boolean;
};
const LgLink = ({ title, target, even = true }: Link) => {
  return (
    <Link
      href={target}
      style={[
        styles.startBTN,
        { backgroundColor: even ? lightTheme.primaryColor : "gray" },
      ]}
    >
      <Text style={{ color: "white", fontSize: 20, fontFamily: "Yekan" }}>
        {title}
      </Text>
    </Link>
  );
};
const styles = StyleSheet.create({
  startBTN: {
    width: 300,
    height: 50,
    backgroundColor: lightTheme.primaryColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    textAlign: "center",
    paddingVertical: 10,
  },
});

export default LgLink;
