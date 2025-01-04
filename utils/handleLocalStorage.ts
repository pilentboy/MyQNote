import AsyncStorage from "@react-native-async-storage/async-storage";
import { string } from "yup";

const storeDataInLocalStorage = async (value: any) => {
  try {
    const notes = await getLocalStorageData();
    if (notes) {
      notes.push(value);
    }
    await AsyncStorage.setItem("notes", JSON.stringify(notes));
    return true;
  } catch (error) {
    console.error("خطا در ذخیره‌سازی:", error);
  }
};

const getLocalStorageData = async () => {
  try {
    const value = await AsyncStorage.getItem("notes");
    if (value) {
      return JSON.parse(value);
    }
    return [];
  } catch (error) {
    console.error("خطا در بازیابی داده‌ها:", error);
  }
};

interface EditingValues {
  id: string | string[];
  editedTitle: string;
  editedMainContent: string;
}

const handleEditingNote = async ({
  id,
  editedTitle,
  editedMainContent,
}: EditingValues) => {
  try {
    const notes = await getLocalStorageData();
    console.log(id, editedTitle);
    if (notes) return true;
  } catch (error) {
    console.error("خطا در بازیابی داده‌ها:", error);
    return false;
  }
};

export { storeDataInLocalStorage, getLocalStorageData, handleEditingNote };
