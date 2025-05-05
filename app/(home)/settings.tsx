import { View } from "react-native";
import {
  getLocalStorageUserNotes,
  handleChangeAppTheme,
  handleDeleteNotes,
  handleGetAppTheme,
  handleDefaultNoteMode,
} from "@/utils/handleLocalStorage";
import useTheme from "@/context/themeProvider";
import SettingsItemWrapper from "@/components/settings/SettingsItemWrapper";
import SettingsTitle from "@/components/settings/SettingsTitle";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomAlert from "@/components/common/CutstomAlert";
import Toast from "react-native-toast-message";
import { useContext, useMemo,useState } from "react";
import { authContext } from "@/context/authProvider";
import Loading from "@/components/common/Loading";
import { RadioButtonProps } from "react-native-radio-buttons-group";
import { deleteUserCloudNotes, fetchUserCloudNotes } from "@/api";
import CustomRadioButton from "@/components/settings/CustomRadioButton";

export default function Settings() {
  const { setTheme, theme } = useTheme();
  const { setUserNotes, accessKey, appMode, setAppMode } =
    useContext(authContext);
	const [loading, setLoading] = useState<boolean>();

  const showToast = (text?: string, type?: string) => {
    Toast.show({
      type: type || "success",
      text2: text || "خطا در برقراری ارتباط",
    });
  };

  // Function to change the app's mode (online/offline)
  const changeAppMode = async () => {
    const updatedAppMode = appMode === "online" ? "offline" : "online";
    await handleDefaultNoteMode(updatedAppMode);
    setAppMode(updatedAppMode);
    const refreshedNotes =
      updatedAppMode === "online"
        ? await fetchUserCloudNotes(accessKey)
        : await getLocalStorageUserNotes();

    if (refreshedNotes.error) {
      showToast(undefined, "error");
      return;
    }
    setUserNotes(updatedAppMode === 'online' ? refreshedNotes.data : refreshedNotes);
    // Display a success toast message
    showToast(
      `یادداشت های ${
        updatedAppMode === "online" ? "آنلاین" : "آفلاین"
      } دریافت شدند`
    );
  };

  const themeRadioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "dark",
        label: "تاریک",
        value: "dark",
      },
      {
        id: "light",
        label: "روشن",
        value: "light",
      },
    ],
    []
  );

  const noteSourseRadioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "online",
        label: "آنلاین",
        value: "online",
      },
      {
        id: "offline",
        label: "آفلاین",
        value: "offline",
      },
    ],
    []
  );

  // Function to change the app's theme
  const changeAppTheme = async () => {
    await handleChangeAppTheme(); // Toggle theme in local storage
    setTheme(await handleGetAppTheme()); // Update theme state based on the new value
  };

  // Function to delete all notes
  const deleteNotes = async () => {
    setLoading(true);
    // delete cloud notes
    if (appMode === "online" && accessKey) {
      try {
        const res = await deleteUserCloudNotes(accessKey);

        if (res.error) {
          showToast("خطا در پاک کردن یادداشت ها", "error");
          return;
        }

        showToast("یادداشت ها با موفقیت حذف شدند");
      
        setUserNotes([]);
      } catch (error) {
        showToast("خطا در برقراری ارتباط", "error");
      }
    } else {
      // delete local notes
      await handleDeleteNotes();
      showToast("یادداشت ها با موفقیت حذف شدند");
      setUserNotes(await getLocalStorageUserNotes());
    }
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <View
      style={{
        gap: 5,
        padding: 10,
        flex: 1,
        backgroundColor: theme === "light" ? "white" : "#222831",
      }}
    >
      {/* Theme toggle setting */}
      <SettingsItemWrapper theme={theme}>
        <CustomRadioButton
          data={themeRadioButtons}
          action={changeAppTheme}
          title="تم برنامه"
          selected={theme}
        />
      </SettingsItemWrapper>

      {/* change app mode */}
      {accessKey && (
        <SettingsItemWrapper theme={theme}>
          <CustomRadioButton
            data={noteSourseRadioButtons}
            action={changeAppMode}
            title="منبع یادداشت ها"
            selected={appMode}
          />
        </SettingsItemWrapper>
      )}

      {/* Delete notes  */}
      <SettingsItemWrapper theme={theme}>
        <MaterialIcons
          onPress={() =>
            CustomAlert(
              "حذف",
              "آیا از حذف تمام یادداشت ها مطمئن هستید؟",
              deleteNotes
            )
          }
          name="delete-forever"
          size={28}
          color="red"
          style={{ marginStart: 10 }}
        />
        <SettingsTitle title="حذف یادداشت ها" theme={theme} />
      </SettingsItemWrapper>
    </View>
  );
}
