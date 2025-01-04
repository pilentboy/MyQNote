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

export {
  storeDataInLocalStorage,
  getLocalStorageData,
  handleEditingNote,
  handleDeleteNote,
};
