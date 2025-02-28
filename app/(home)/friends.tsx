import { View, Text } from "react-native";

import useTheme from "@/context/themeProvider";

export default function Frinds() {
  const { setTheme, theme } = useTheme(); // Access and set the app's current theme

  return (
    <View>
      <Text>frind list</Text>
    </View>
  );
}
