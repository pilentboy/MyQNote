import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import CustomDrawerContent from "@/components/home/CustomDrawerContent";
import DrawerCustomHeader from "@/components/home/DrawerCustomHeader";
import useTheme from "@/context/themeProvider";
import { useContext } from "react";
import { authContext } from "@/context/authProvider";

export default function Layout() {
  const labelFontSize = 14;
  const { theme } = useTheme();
  const { accessKey } = useContext(authContext);

  const CommonDrawerIconStyle = (Icon: any, name: any, focused: any) => (
    <Icon
      name={name}
      size={labelFontSize}
      color={focused || theme === "dark" ? "white" : "black"}
    />
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Drawer navigation setup */}
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={() => {
          return {
            header: ({ navigation, route }) => (
              <DrawerCustomHeader
                navigation={navigation}
                currentRoute={route}
              />
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
          };
        }}
      >
        {/* First screen in the drawer */}
        <Drawer.Screen
          name="index"
          options={{
            title: "یادداشت",
            drawerLabel: "یادداشت",
            drawerIcon({ focused }) {
              return CommonDrawerIconStyle(
                MaterialCommunityIcons,
                "lead-pencil",
                focused
              );
            },
          }}
        />

        {/* Second  screen in the drawer */}

        <Drawer.Screen
          name="(friends)"
          options={{
            title: "دوستان",
            drawerLabel: "دوستان",
            drawerItemStyle: {
              display: accessKey ? "flex" : "none",
              borderRadius: 8,
              marginVertical: 3,
            },
            drawerIcon({ focused }) {
              return CommonDrawerIconStyle(
                FontAwesome5,
                "user-friends",
                focused
              );
            },
          }}
        />

        {/* Third screen in the drawer */}
        <Drawer.Screen
          name="settings"
          options={{
            title: "تنظیمات",
            drawerLabel: "تنظیمات",
            drawerIcon({ focused }) {
              return CommonDrawerIconStyle(
                SimpleLineIcons,
                "settings",
                focused
              );
            },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
