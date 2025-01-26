import { View, Switch } from "react-native";
import {
  handleChangeAppTheme,
  handleGetAppTheme,
} from "@/utils/handleLocalStorage";
import useTheme from "@/context/themeProvider";
import SettingsItemWrapper from "@/components/settings/settingsItemWrapper";
import SettingsTitle from "@/components/settings/settingsTitle";

export default function Settings() {
  const { setTheme, theme } = useTheme();

  const changeAppTheme = async () => {
    await handleChangeAppTheme();
    setTheme(await handleGetAppTheme());
  };

  return (
    <View
      style={{
        gap: 5,
        padding: 10,
        flex: 1,
        backgroundColor: theme === "light" ? "white" : "#222831",
      }}
    >
      <SettingsItemWrapper theme={theme}>
        <Switch
          value={theme === "light" ? true : false}
          onValueChange={changeAppTheme}
        />

        <SettingsTitle title="تم برنامه" theme={theme} />
      </SettingsItemWrapper>
    </View>
  );
}
