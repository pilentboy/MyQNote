import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { DrawerNavigationProp } from "@react-navigation/drawer";

export default function CustomHeader({
  navigation,
}: {
  navigation: DrawerNavigationProp<any>;
}) {
  return (
    <View
      style={{
        height: 85,
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
      }}
    ></View>
  );
}
// onPress={() => navigation.toggleDrawer()}
