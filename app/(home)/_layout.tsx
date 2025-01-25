import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import CustomDrawerContent from "@/components/customDrawerContent";
import DrawerCustomHeader from "@/components/drawerCustomHeader";
import useTheme from "@/context/themeProvider";
import { lightTheme } from "@/constants/theme";

export default function Layout() {
  const labelFontSize = 14;
  const { theme } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
          header: ({ navigation }) => (
            <DrawerCustomHeader navigation={navigation} />
          ),
          drawerStatusBarAnimation: "fade",
          drawerType: "slide",
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
          drawerInactiveTintColor: theme === "light" ? "black" : "white",
          drawerStyle: {
            backgroundColor: "white",
            width: 175,
          },
          sceneStyle: {
            backgroundColor: theme === "light" ? "white" : "#222831",
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
                  color={focused || theme === "dark" ? "white" : "black"}
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
                  color={focused || theme === "dark" ? "white" : "black"}
                />
              );
            },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
