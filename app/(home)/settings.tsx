import { View, Switch } from "react-native";
import {
  getLocalStorageData,
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

export default function Settings() {
  const { setTheme, theme } = useTheme(); // Access and set the app's current theme
  const { setUserNotes, accessKey } = useContext(authContext); // Access and update user notes from the context

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

  const handleDeleteCloudNotes = async () => {
    console.log("t");
    try {
      const res = await fetch("http://10.0.2.2:3000/delete_notes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "shYqiZ7vc4?QoiatSIOA9MHMxOsBW2Wckzc5GAsO3xvzkUVr/24zxssYdAOlta-5/lKBdOb0Q3hW7ClRsrgAX?kmQa8-o9qfpwUhP7v/CR8St!wO5VanxxjZ12gG2CHi",
          Authorization: `Bearer ${accessKey}`,
        },
      });

      const resJson = await res.json();
      return resJson;
    } catch (error) {
      console.log(error);
    }
  };

  // Function to delete all notes from local storage
  const deleteNotes = async () => {
    if (accessKey) {
      const res = await handleDeleteCloudNotes();
      if (res.error) {
        showToast("خطا در پاک کردن یادداشت ها", "error");
      } else {
        showToast("یادداشت ها با موفقیت حذف شدند");
      }
    } else {
      await handleDeleteNotes(); // Delete notes from local storage
      showToast("یادداشت ها با موفقیت حذف شدند");
      setUserNotes(await getLocalStorageData()); // reset notes state
    }
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
        <SettingsTitle title="حذف نوشته ها" theme={theme} />
      </SettingsItemWrapper>
    </View>
  );
}
