import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { lightTheme } from "@/constants/theme";
import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import CustomDrawerContent from "@/components/customDrawerContent";
import Feather from "@expo/vector-icons/Feather";
import { CroppedLogo } from "@/components/logo";
import CustomHeader from "@/components/customHeader";

export default function Layout() {
  const labelFontSize = 14;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
          header: ({ navigation }) => <CustomHeader navigation={navigation} />,
          headerLeft: () => {
            return (
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
            );
          },
          headerStyle: {
            backgroundColor: "white",
          },
          drawerPosition: "right",
          headerTitleStyle: {
            display: "none",
          },
          drawerLabelStyle: {
            fontFamily: "Yekan",
            direction: "rtl",
            fontSize: labelFontSize,
            fontWeight: "bold",
          },
          drawerActiveBackgroundColor: "#0165b6",
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "black",
          drawerStyle: {
            backgroundColor: "white",
            width: 175,
          },
          sceneStyle: {
            backgroundColor: "white",
          },
          drawerItemStyle: {
            borderRadius: 8,
            marginVertical: 3,
          },
        })}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "یادداشت",
            drawerLabel: "یادداشت",
            drawerIcon({ focused }) {
              return (
                <MaterialCommunityIcons
                  name="lead-pencil"
                  size={labelFontSize}
                  color={focused ? "white" : "black"}
                />
              );
            },
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            title: "تنظیمات",
            drawerLabel: "تنظیمات",
            drawerIcon({ focused }) {
              return (
                <SimpleLineIcons
                  name="settings"
                  size={labelFontSize}
                  color={focused ? "white" : "black"}
                />
              );
            },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
