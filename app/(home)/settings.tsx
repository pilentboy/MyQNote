import { View, Switch } from "react-native"; 
import {
  getLocalStorageData,
  handleChangeAppTheme,
  HandleDeleteNotes,
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
  const { setUserNotes } = useContext(authContext); // Access and update user notes from the context

  // Function to display a success toast message
  const showToast = () => {
    Toast.show({
      type: "success", // Toast type
      text2: "با موفقیت حذف شدند", // Success message
    });
  };

  // Function to change the app's theme
  const changeAppTheme = async () => {
    await handleChangeAppTheme(); // Toggle theme in local storage
    setTheme(await handleGetAppTheme()); // Update theme state based on the new value
  };

  // Function to delete all notes from local storage
  const deleteLocalNotes = async () => {
    await HandleDeleteNotes(); // Delete notes in local storage
    setUserNotes(await getLocalStorageData()); // Update state with the new data
    showToast(); // Show success toast
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
              "آیا از حذف تمام نوشته ها مطئن هستید؟", 
              deleteLocalNotes // Callback for confirming deletion
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
