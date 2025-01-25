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

const handleFilterLocalStorageNote = async (filterText: string) => {
  try {
    const value = await AsyncStorage.getItem("notes");
    if (value) {
      const notes = JSON.parse(value);
      const searchedNotes = notes?.filter((notes: any) =>
        notes.title.includes(filterText)
      );
      return searchedNotes;
    }
  } catch (error) {
    console.error("خطا در فیلتر داده ها :", error);
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
    const updatedNotes = await getLocalStorageData();
    const editingNoteIndex = updatedNotes.findIndex(
      (note: any) => note.id === id
    );
    let editedNote = updatedNotes[editingNoteIndex];
    editedNote = {
      ...editedNote,
      title: editedTitle,
      mainContent: editedMainContent,
    };

    updatedNotes[editingNoteIndex] = editedNote;
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));

    return true;
  } catch (error) {
    console.error("خطا در ویرایش داده‌ها:", error);
    return false;
  }
};

const handleDeleteNote = async (id: string | string[]) => {
  try {
    const notes = await getLocalStorageData();
    const updatedNotes = notes.filter((note: any) => note.id !== id);

    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));

    return true;
  } catch (error) {
    console.error("خطا در حذف اطلاعات", error);
    return false;
  }
};

const handleDefaultNoteMode = async (mode: "offline" | "online") => {
  await AsyncStorage.setItem("defaultMode", mode);
};

const handleGetAppMode = async () => {
  return await AsyncStorage.getItem("defaultMode");
};

const handleGetAppTheme = async () => {
  const currentTheme = await AsyncStorage.getItem("theme");
  if (!currentTheme) {
    await AsyncStorage.setItem("theme", "light");
    return "light";
  }
  return currentTheme;
};

const handleChangeAppTheme = async () => {
  const currentTheme = await AsyncStorage.getItem("theme");

  await AsyncStorage.setItem(
    "theme",
    currentTheme === "light" ? "dark" : "light"
  );
};

export {
  storeDataInLocalStorage,
  getLocalStorageData,
  handleEditingNote,
  handleDeleteNote,
  handleFilterLocalStorageNote,
  handleDefaultNoteMode,
  handleGetAppMode,
  handleChangeAppTheme,
  handleGetAppTheme,
};
