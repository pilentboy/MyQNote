import { View, Text } from "react-native";

import useTheme from "@/context/themeProvider";
import FloatingActionButton from "./../../components/home/floatingActionButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect } from "react";

export default function Frinds() {
  const { setTheme, theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* Add this */}
      <FloatingActionButton
        display={true}
        action={() => {}}
        icon={<AntDesign name="adduser" size={24} color="white" />}
      />
    </View>
  );
}
