import { Text } from "react-native";

const SettingsTitle = ({ title, theme }: { title: string; theme: string }) => (
  <Text
    style={{
      color: theme === "light" ? "black" : "white",
      fontFamily: "Yekan",
      fontWeight: "bold",
      fontSize: 16,
    }}
  >
    {title}
  </Text>
);

export default SettingsTitle;
