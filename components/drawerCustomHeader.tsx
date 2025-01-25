import { View, Text, TextInput, Pressable } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { lightTheme } from "@/constants/theme";
import { CroppedLogo } from "./logo";
import AntDesign from "@expo/vector-icons/AntDesign";
import SearchInput from "./searchInput";

export default function DrawerCustomHeader({
  navigation,
}: {
  navigation: DrawerNavigationProp<any>;
}) {
  return (
    <View
      style={{
        height: 110,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
        backgroundColor: "white",
        shadowColor: "#000",
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
              color: "black",
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
          <AntDesign
            name="menufold"
            size={24}
            color={lightTheme.primaryColor}
          />
        </Pressable>
      </View>
      {/* bottom header */}
      <SearchInput />
    </View>
  );
}
