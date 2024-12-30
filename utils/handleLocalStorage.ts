import AsyncStorage from "@react-native-async-storage/async-storage";

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

export { storeDataInLocalStorage, getLocalStorageData };
