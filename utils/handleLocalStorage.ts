import AsyncStorage from "@react-native-async-storage/async-storage";

const storeDataInLocalStorage = async (value: any) => {
  try {
    const notes = await getLocalStorageUserNotes();
    if (notes) {
      notes.push(value);
    }
    await AsyncStorage.setItem("notes", JSON.stringify(notes));
    return true;
  } catch (error) {
    console.error("خطا در ذخیره‌سازی:", error);
  }
};

const getLocalStorageUserNotes = async () => {
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
  editedContent: string;
  direction: string;
}

const handleEditingNote = async ({
  id,
  editedTitle,
  editedContent,
  direction,
}: EditingValues) => {
  try {
    const updatedNotes = await getLocalStorageUserNotes();
    const editingNoteIndex = updatedNotes.findIndex(
      (note: any) => note.id === id
    );
    let editedNote = updatedNotes[editingNoteIndex];
    editedNote = {
      ...editedNote,
      title: editedTitle,
      content: editedContent,
    };

    updatedNotes[editingNoteIndex] = editedNote;
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));

    return true;
  } catch (error) {
    console.error("خطا در ویرایش داده‌ها:", error);
    return false;
  }
};

const handleDeleteLocalNote = async (id: string | string[]) => {
  try {
    const notes = await getLocalStorageUserNotes();
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
  console.log("mode changed");
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

const handleDeleteNotes = async () => {
  await AsyncStorage.setItem("notes", JSON.stringify([]));
};

const handleSetAccessKey = async (accessKey: string) => {
  try {
    await AsyncStorage.setItem("access_key", JSON.stringify(accessKey));
    console.log("access_key key set");
  } catch (error) {
    console.log("error setting refresh key: ", error);
  }
};

const handleRemoveAccessKey = async () => {
  try {
    await AsyncStorage.removeItem("access_key");
    console.log("access_key deleted");
  } catch (error) {
    console.log("error setting refresh key: ", error);
  }
};

export {
  storeDataInLocalStorage,
  getLocalStorageUserNotes,
  handleEditingNote,
  handleDeleteLocalNote,
  handleFilterLocalStorageNote,
  handleDefaultNoteMode,
  handleGetAppMode,
  handleChangeAppTheme,
  handleGetAppTheme,
  handleDeleteNotes,
  handleSetAccessKey,
  handleRemoveAccessKey,
};
