import { lightTheme } from "@/constants/theme";
import { authContext } from "@/context/authProvider";
import { handleDefaultNoteMode, handleRemoveAccessKey } from "@/utils/handleLocalStorage";
import { Link } from "expo-router";
import { useContext } from "react";
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
  const { setAppMode, setAccessKey } = useContext(authContext);

  return (
    <Link
      href={{ pathname: target, params: data }}
      style={[
        styles.startBTN,
        { backgroundColor: bgColor ? lightTheme.primary : "gray" },
      ]}
      onPress={async () => {
        if (title === "ورود آفلاین") {
          setAppMode("offline");
          setAccessKey(undefined);
          await handleDefaultNoteMode("offline");
          await handleRemoveAccessKey();
        }
      }}
      asChild
    >
      <TouchableOpacity activeOpacity={0.7}>
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
    backgroundColor: lightTheme.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    textAlign: "center",
    paddingVertical: 10,
  },
});

export default CustomLink;
