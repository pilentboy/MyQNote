import { View, Text, Pressable } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { lightTheme } from "@/constants/theme";
import { CroppedLogo } from "../logo";
import AntDesign from "@expo/vector-icons/AntDesign";
import SearchInput from "./searchInput";
import useTheme from "@/context/themeProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import EditContainer from "../EditContainer";
import useEdit from "@/context/editProvider";

export default function DrawerCustomHeader({
  navigation,
}: {
  navigation: DrawerNavigationProp<any>;
}) {
  const { theme } = useTheme();
  const { setTextDirection } = useEdit();
  const [displaySearch, setDisplaySearch] = useState<boolean>(false);

  return (
    <View
      style={{
        height: 110,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
        backgroundColor: theme === "light" ? "white" : "#222831",
        shadowColor: theme === "light" ? "#000" : "white",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      {/* top header  */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 10,
          }}
        >
          <CroppedLogo size={30} />
          <Text
            style={{
              color: theme === "light" ? "black" : "white",
              fontSize: 14,
              textAlign: "center",
              fontFamily: "Yekan",
            }}
          >
            مایک نت
          </Text>
        </View>
        <Pressable
          style={{ paddingHorizontal: 10 }}
          onPress={() => navigation.toggleDrawer()}
        >
          <AntDesign name="menufold" size={24} color={lightTheme.primary} />
        </Pressable>
      </View>
      {/* bottom header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: displaySearch ? "space-between" : "space-between",
          width: "100%",
          padding: 10,
        }}
      >
        {displaySearch ? (
          <>
            <AntDesign
              name="closecircleo"
              size={24}
              color="red"
              onPress={() => setDisplaySearch(false)}
            />
            <SearchInput />
          </>
        ) : (
          <>
            <FontAwesome
              name="search"
              size={24}
              color="white"
              onPress={() => setDisplaySearch(true)}
            />
            <EditContainer width={"85%"} setTextDirection={setTextDirection} />
          </>
        )}
      </View>
    </View>
  );
}
