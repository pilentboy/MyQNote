import { View, Text, TouchableOpacity } from "react-native";
import {
  handleChangeAppTheme,
  handleGetAppTheme,
} from "@/utils/handleLocalStorage";
import useTheme from "@/context/themeProvider";

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
          borderBottomWidth: 1,
          borderBottomColor: "gray",
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            height: 25,
            borderRadius: 5,
            backgroundColor: theme === "light" ? "black" : "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          activeOpacity={0.7}
          onPress={() => changeAppTheme()}
        >
          <Text
            style={{
              color: theme === "light" ? "white" : "black",
              fontFamily: "Yekan",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {theme === "light" ? "تاریک" : "روشن"}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: theme === "light" ? "black" : "white",
            fontFamily: "Yekan",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          تغییر تم برنامه
        </Text>
      </View>
    </View>
  );
}
