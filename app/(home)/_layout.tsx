// Importing necessary modules and components
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Provides root view for gesture handling
import { Drawer } from "expo-router/drawer";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import CustomDrawerContent from "@/components/home/customDrawerContent"; // Custom content for the drawer
import DrawerCustomHeader from "@/components/home/drawerCustomHeader"; // Custom header component for the drawer
import useTheme from "@/context/themeProvider";
import { useContext } from "react";
import { authContext } from "@/context/authProvider";

export default function Layout() {
  const labelFontSize = 14; // Font size for drawer labels
  const { theme } = useTheme();
  const { accessKey } = useContext(authContext);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Drawer navigation setup */}
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation }) => {
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
              return (
                <FontAwesome5
                  name="user-friends"
                  size={labelFontSize}
                  color={focused || theme === "dark" ? "white" : "black"}
                />
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
