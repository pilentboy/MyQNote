import { StyleSheet, Text, View } from "react-native";
import { lightTheme } from "@/constants/theme";
import { ExternalPathString, Link, RelativePathString } from "expo-router";
import useTheme from "@/context/themeProvider";

const AuthSwitchPropmt = ({
  title,
  linkPath,
  linkTitle,
  clearErorrs,
}: {
  title: string;
  linkPath: string;
  linkTitle: string;
  clearErorrs: () => void;
}) => {
  const { theme } = useTheme();
  return (
    <View style={styles.wrapper}>
      <Text
        style={{
          fontFamily: "Vazir",
          fontSize: 14,
          color: theme === "light" ? "black" : "white",
        }}
      >
        {title}
      </Text>

      <Link
        href={`/(auth)/${linkPath}` as ExternalPathString | RelativePathString}
        replace
        onPress={() => clearErorrs()}
        style={{
          color: lightTheme.primary,
          fontSize: 15,
          fontFamily: "Vazir",
        }}
      >
        {linkTitle}
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    width: 300,
    justifyContent: "center",
    paddingTop: 5,
    borderTopWidth: 1,
    borderColor: "#C0C0C0",
  },
});
export default AuthSwitchPropmt;
