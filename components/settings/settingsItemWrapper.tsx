import { View } from "react-native";
import { lightTheme } from "@/constants/theme";
import { ReactNode } from "react";
const SettingsItemWrapper = ({
  children,
  theme,
}: {
  children: ReactNode;
  theme: string;
}) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 5,
      width: "100%",
      height: 50,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme === "light" ? lightTheme.primary : "#2C394B",
      padding: 5,
      backgroundColor: theme === "dark" ? "#2C394B" : "transparent",
    }}
  >
    {children}
  </View>
);

export default SettingsItemWrapper;
