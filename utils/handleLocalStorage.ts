import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value: any) => {
  try {
    let newNote;
    const notes = await getData();
    if (notes) {
      notes.push(value);
      newNote = notes;
    } else {
      newNote = [value];
    }
    await AsyncStorage.setItem("notes", JSON.stringify(newNote));
    return true;
  } catch (error) {
    console.error("خطا در ذخیره‌سازی:", error);
  }
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("notes");
    if (value !== null) {
      console.log(value, "xxxx");
      return JSON.parse(value);
    } else {
      console.log("هیچ اطلاعاتی یافت نشد");
    }
  } catch (error) {
    console.error("خطا در بازیابی داده‌ها:", error);
  }
};

export { storeData, getData };
