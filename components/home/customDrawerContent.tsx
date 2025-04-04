import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text } from "react-native";
import { CroppedLogo } from "../common/Logo";
import { Link } from "expo-router";
import { lightTheme } from "@/constants/theme";
import { useContext } from "react";
import { authContext } from "@/context/authProvider";
import useTheme from "@/context/themeProvider";

export default function CustomDrawerContent(props: any) {
  const { appMode, accessKey } = useContext(authContext);
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 5,
        backgroundColor: theme === "light" ? "white" : "#222831",
      }}
    >
      <View
        style={{
          height: 60,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CroppedLogo size={30} />
        <Text
          style={{
            color: lightTheme.gray,
            fontSize: 14,
            textAlign: "center",
            fontFamily: "Yekan",
          }}
        >
          مایک نت
        </Text>
      </View>

      <DrawerContentScrollView {...props}>
        <View style={{ borderTopWidth: 1, borderTopColor: "#EEEDEB" }}>
          <DrawerItemList
            state={props.state}
            navigation={props.navigation}
            descriptors={props.descriptors}
          />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: 60,
        }}
      >
        <Link
          href="/(auth)"
          style={{
            color: theme === "light" ? "black" : "white",
            fontSize: 11,
            textAlign: "center",
            fontFamily: "Yekan",
          }}
          // replace
        >
          {appMode === "offline" && !accessKey
            ? "ورود به حساب"
            : "خروج از حساب"}
        </Link>

        <Text
          style={{
            color: lightTheme.gray,
            fontSize: 10,
            textAlign: "center",
            fontFamily: "Yekan",
          }}
        >
          تمام حقوق برای مایک نت محفوظ است
        </Text>
      </View>
    </View>
  );
}
