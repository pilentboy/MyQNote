import { View, Text, Switch } from "react-native";
import {
  handleChangeAppTheme,
  handleGetAppTheme,
} from "@/utils/handleLocalStorage";
import useTheme from "@/context/themeProvider";
import { lightTheme } from "@/constants/theme";

export default function Settings() {
  const { setTheme, theme } = useTheme();

  const changeAppTheme = async () => {
    await handleChangeAppTheme();
    setTheme(await handleGetAppTheme());
  };

  return (
    <View
      style={{
        gap: 5,
        padding: 10,
        flex: 1,
        backgroundColor: theme === "light" ? "white" : "#222831",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 5,
          width: "100%",
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: theme === "light" ? lightTheme.primaryColor : "#2C394B",
          padding: 5,
          backgroundColor: theme === "dark" ? "#2C394B" : "transparent",
        }}
      >
        <Switch
          value={theme === "light" ? true : false}
          onValueChange={changeAppTheme}
        />

        <Text
          style={{
            color: theme === "light" ? "black" : "white",
            fontFamily: "Yekan",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          تغییر تم
        </Text>
      </View>
    </View>
  );
}
