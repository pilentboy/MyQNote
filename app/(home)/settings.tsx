import { View, Switch } from "react-native";
import {
  getLocalStorageUserNotes,
  handleChangeAppTheme,
  handleDeleteNotes,
  handleGetAppTheme,
} from "@/utils/handleLocalStorage"; // Utility functions for local storage operations
import useTheme from "@/context/themeProvider";
import SettingsItemWrapper from "@/components/settings/settingsItemWrapper"; // Custom wrapper component for settings items
import SettingsTitle from "@/components/settings/settingsTitle"; // Custom component for displaying settings titles
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomAlert from "@/components/cutstomAlert";
import Toast from "react-native-toast-message"; // Library for displaying toast notifications
import { useContext } from "react";
import { authContext } from "@/context/authProvider"; // Context for managing authentication and user-related data
import handleDeleteCloudNotes from "@/api/handleDeleteCloudNotes";
import Loading from "@/components/loading";
import handleGetUserCloudNotes from "@/api/handleGetUserCloudNotes";

export default function Settings() {
  const { setTheme, theme } = useTheme(); // Access and set the app's current theme
  const { setUserNotes, accessKey, setLoading, loading } =
    useContext(authContext); // Access and update user notes from the context

  // Function to display a success toast message
  const showToast = (text: string, type?: string) => {
    Toast.show({
      type: type || "success",
      text2: text, // Success message
    });
  };

  // Function to change the app's theme
  const changeAppTheme = async () => {
    await handleChangeAppTheme(); // Toggle theme in local storage
    setTheme(await handleGetAppTheme()); // Update theme state based on the new value
  };

  // Function to delete all notes
  const deleteNotes = async () => {
    setLoading(true);
    // delete cloud notes
    if (accessKey) {
      try {
        const res = await handleDeleteCloudNotes(accessKey);

        if (res.error) {
          showToast("خطا در پاک کردن یادداشت ها", "error");
        } else {
          showToast("یادداشت ها با موفقیت حذف شدند");
        }
        // reset notes state
        const updatedCloudNotes = await handleGetUserCloudNotes(accessKey);
        if (updatedCloudNotes.message) {
          alert("خطا در بروزرسانی یادداشت ها");
        } else {
          setUserNotes(updatedCloudNotes);
        }
      } catch (error) {
        showToast("خطا در برقراری ارتباط", "error");
      }
    } else {
      // delete local notes
      await handleDeleteNotes(); // Delete notes from local storage
      showToast("یادداشت ها با موفقیت حذف شدند");
      setUserNotes(await getLocalStorageUserNotes()); // reset notes state
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
        <Switch
          value={theme === "light"}
          onValueChange={changeAppTheme} // Handler for theme change
        />
        <SettingsTitle title="تم برنامه" theme={theme} />
      </SettingsItemWrapper>

      {/* Delete notes setting */}
      <SettingsItemWrapper theme={theme}>
        <MaterialIcons
          onPress={() =>
            CustomAlert(
              "حذف", // Alert title
              "آیا از حذف تمام یادداشت ها مطمئن هستید؟",
              deleteNotes // Callback for confirming deletion
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
