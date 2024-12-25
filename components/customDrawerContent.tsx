import {
  DrawerContentScrollView,
  DrawerItemList
} from "@react-navigation/drawer";
import { View, Text, TouchableOpacity } from "react-native";
import { CroppedLogo } from "./logo";
import { useRouter } from "expo-router";
import { lightTheme } from "@/constants/theme";

export default function CustomDrawerContent(props: any) {
  const router = useRouter();

  return (
    <View style={{ flex: 1, paddingVertical: 5 }}>
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
          <DrawerItemList {...props} />
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
        <TouchableOpacity
          onPress={() => {
            router.replace("/(auth)");
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 13,
              textAlign: "center",
              fontFamily: "Yekan",
            }}
          >
            خروج از حساب{" "}
          </Text>
        </TouchableOpacity>

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
