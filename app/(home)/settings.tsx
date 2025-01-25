import { View, Text, Button } from "react-native";
import {
  handleChangeAppTheme,
  handleGetAppMode,
  handleGetAppTheme,
} from "@/utils/handleLocalStorage";

export default function Settings() {
  const changeAppTheme = async () => {
    await handleChangeAppTheme();
    const x = await handleGetAppTheme();
    console.log(x);
  };

  return (
    <View style={{ gap: 5, padding: 10, flex: 1 }}>
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
        <Button title="تغییر تم" onPress={() => changeAppTheme()} />
        <Text
          style={{
            color: "black",
            fontFamily: "Yekan",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          تم برنامه
        </Text>
      </View>
    </View>
  );
}
