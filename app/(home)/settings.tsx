import { View, Switch, TouchableOpacity } from "react-native";
import {
  getLocalStorageData,
  handleChangeAppTheme,
  HandleDeleteNotes,
  handleGetAppTheme,
} from "@/utils/handleLocalStorage";
import useTheme from "@/context/themeProvider";
import SettingsItemWrapper from "@/components/settings/settingsItemWrapper";
import SettingsTitle from "@/components/settings/settingsTitle";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomAlert from "@/components/cutstomAlert";
import Toast from "react-native-toast-message";
import { useContext } from "react";
import { authContext } from "@/context/authProvider";
export default function Settings() {
  const { setTheme, theme } = useTheme();
  const { setUserNotes } = useContext(authContext);

  const showToast = () => {
    Toast.show({
      type: "success",
      text2: "با موفقیت حذف شدند",
    });
  };

  const changeAppTheme = async () => {
    await handleChangeAppTheme();
    setTheme(await handleGetAppTheme());
  };

  const deleteLocalNotes = async () => {
    await HandleDeleteNotes();
    setUserNotes(await getLocalStorageData());
    showToast();
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
      <SettingsItemWrapper theme={theme}>
        <MaterialIcons
          onPress={() =>
            CustomAlert(
              "حذف",
              "آیا از حذف تمام نوشته ها مطئن هستید؟",
              deleteLocalNotes
            )
          }
          name="delete-forever"
          size={28}
          color="red"
          style={{ marginStart: 10 }}
        />

        <SettingsTitle title="حذف نوشته ها" theme={theme} />
      </SettingsItemWrapper>
    </View>
  );
}
