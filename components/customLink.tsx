import { lightTheme } from "@/constants/theme";
import { Link } from "expo-router";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

type LinkProps = {
  title: string;
  target: any | string;
  bgColor?: boolean;
  data?: {};
};

const CustomLink = ({
  title,
  target,
  bgColor = true,
  data = {},
}: LinkProps) => {
  return (
    <Link
      href={{ pathname: target, params: data }}
      style={[
        styles.startBTN,
        { backgroundColor: bgColor ? lightTheme.primaryColor : "gray" },
      ]}
      asChild
    >
      <TouchableOpacity>
        <Text style={{ color: "white", fontSize: 20, fontFamily: "Yekan" }}>
          {title}
        </Text>
      </TouchableOpacity>
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
    borderRadius: 8,
    textAlign: "center",
    paddingVertical: 10,
  },
});

export default CustomLink;
