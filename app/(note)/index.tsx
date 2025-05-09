import EditContainer from "@/components/common/EditContainer";
import { authContext } from "@/context/authProvider";
import useSubmitNoteType from "@/context/submitNoteTypeProvider";
import useTheme from "@/context/themeProvider";
import getCurrentDate from "@/utils/convertToPersianDigits";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFocusEffect } from "expo-router";
import {
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import "react-native-get-random-values";
import Toast from "react-native-toast-message";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import Loading from "../../components/common/Loading";
import {
  getLocalStorageUserNotes,
  handleDeleteLocalNote,
  handleEditingNote,
  storeDataInLocalStorage,
} from "../../utils/handleLocalStorage";
import {
  addUserCloudNote,
  deleteCloudNote,
  editCloudNote,
  fetchUserCloudNotes,
} from "@/api";

const Note = () => {
  const windowHeight = Dimensions.get("window").height;
  const { setSubmitAction, submitNoteType, setDeleteNote } =
    useSubmitNoteType();
  const router = useRouter();
  const {
    setUserNotes,
    accessKey,
    setSearchValue,
    appMode,
    setSharedNoteUsername,
  } = useContext(authContext);
  const [loading, setLoading] = useState<boolean>();
  const [inputHeight, setinputHeight] = useState(windowHeight - 260);
  const { id, editedTitle, editedContent, direction } = useLocalSearchParams();
  const { theme } = useTheme();

  useFocusEffect(() => {
    return () => {
      setSharedNoteUsername(undefined);
    };
  });

  const [textDirection, setTextDirection] = useState<"right" | "left">(
    (direction === "left" || direction === "right" ? direction : "right") as
      | "right"
      | "left"
  );

  const showToast = (text?: string, type?: string) => {
    Toast.show({
      type: type || "success",
      text2: text || "خطا در برقراری ارتباط",
    });
  };

  useEffect(() => {
    if (submitNoteType === "newNote") {
      setSubmitAction(() =>
        handleSubmit(
          appMode === "online" && accessKey
            ? addCloudNote
            : handleAddingLocalNote
        )
      );
    } else {
      setSubmitAction(() =>
        handleSubmit(
          appMode === "online" && accessKey
            ? handleEditingCloudNote
            : handleEditLocalNote
        )
      );
    }
  }, [textDirection]);

  useEffect(() => {
    setDeleteNote(() =>
      appMode === "online" && accessKey
        ? handleDeleteCloudNote
        : deleteLocalNote
    );

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setinputHeight(250)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setinputHeight(windowHeight - 260)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .max(35, "حداکثر 35 کاراکتر برای عنوان مجاز می باشد.")
      .required("عنوان نمی تواند خالی باشد"),
    content: Yup.string().required("یادداشت نمی تواند خالی باشد"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      title: editedTitle?.toString() || "",
      content: editedContent?.toString() || "",
    },
    resolver: yupResolver(validationSchema),
  });

  //------------ offline adding note
  const handleAddingLocalNote = async (data: any) => {
    let submitState: boolean | undefined;
    setLoading(true);

    // add a local note
    submitState = await storeDataInLocalStorage({
      ...data,
      id: uuidv4(),
      date: getCurrentDate()[0],
      time: getCurrentDate()[1],
      direction: textDirection,
    });

    if (submitState) {
      setUserNotes(await getLocalStorageUserNotes());
      reset();
      clearErrors();
      showToast("با موفقیت افزوده شد");
      router.push("/(home)");
    } else {
      showToast(`خطا در ذخیره یادداشت`, "error");
    }
    setLoading(false);
  };

  //------------ offline editing note
  const handleEditLocalNote = async (data: any) => {
    let submitState: boolean | undefined;
    setLoading(true);

    // edit local note
    submitState = await handleEditingNote({
      id,
      editedTitle: data.title,
      editedContent: data.content,
      direction: textDirection,
    });

    if (submitState) {
      setUserNotes(await getLocalStorageUserNotes());
      reset();
      clearErrors();
      showToast("با موفقیت ویرایش شد");
      setSearchValue("");
      router.replace("/(home)");
    } else {
      showToast(`خطا در ویرایش یادداشت`, "error");
    }
    setLoading(false);
  };

  const deleteLocalNote = async () => {
    setLoading(true);
    const result = await handleDeleteLocalNote(id);
    if (result) {
      setUserNotes(await getLocalStorageUserNotes());
      showToast("با موفقیت حذف شد");
      router.replace("/(home)");
    } else {
      showToast("خطا در حذف نوت", "error");
    }
    setLoading(false);
  };

  //------------ end offline action handleres

  //------------  cloud action handlers
  const handleDeleteCloudNote = async () => {
    setLoading(true);
    try {
      const data = await deleteCloudNote(accessKey, id);

      if (data.error) {
        showToast(data.error, "error");
        return;
      }
      showToast(data.message);

      const refreshedNotes = await fetchUserCloudNotes(accessKey);
      if (refreshedNotes.error) {
        showToast("خطا در دریافت یادداشت ها", "error");
      } else {
        setUserNotes(refreshedNotes.data);
      }
      router.replace("/(home)");
    } catch (error) {
      showToast("خطا در برقراری ارتباط", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditingCloudNote = async (editedNote: any) => {
    setLoading(true);
    try {
      const data = await editCloudNote(accessKey, {
        title: editedNote.title,
        content: editedNote.content,
        date: getCurrentDate()[0],
        time: getCurrentDate()[1],
        post_id: id,
        direction: textDirection,
      });

      if (data.error) {
        showToast(data.error || data.message, "error");
		console.log(data)
        return;
      }
      showToast("با موفقیت ویرایش شد");
	

      // update user notes after editing
      const refreshedNotes = await fetchUserCloudNotes(accessKey);
      if (refreshedNotes.error) {
        showToast("خطا در دریافت یادداشت ها", "error");
      } else {
        setUserNotes(refreshedNotes.data);
      }
      // redirect to home page
      router.replace("/(home)");
    } catch (error: any) {
      showToast("خطا در برقراری ارتباط", "error");
    } finally {
      setLoading(false);
    }
  };

  const addCloudNote = async (data: any) => {
    setLoading(true);
    try {
      const res = await addUserCloudNote(accessKey, {
        title: data.title,
        content: data.content,
        date: getCurrentDate()[0],
        time: getCurrentDate()[1],
        direction: textDirection,
      });
console.log(res,'xxx')
      reset();
      clearErrors();
      showToast("یادداشت با موفقیت افزوده شده");
      router.push("/(home)");
    } catch (error: any) {
      showToast("خطا در برقراری ارتباط", "error");
    } finally {
      setLoading(false);
    }
  };

  //------------ end cloud action handlere

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingVertical: 5,
        backgroundColor: theme === "light" ? "white" : "#222831",
      }}
      keyboardShouldPersistTaps="handled"
    >
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.contentContainer}>
          <EditContainer setTextDirection={setTextDirection} />
          {errors.title && (
            <Text style={styles.errorText}>{errors.title.message}</Text>
          )}

          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.noteInput,
                  {
                    color: theme === "light" ? "black" : "white",
                    textAlign: textDirection,
                  },
                ]}
                placeholder="عنوان"
                placeholderTextColor="#A9A9A9"
                numberOfLines={1}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.content && (
            <Text style={styles.errorText}>{errors.content.message}</Text>
          )}
          <Controller
            name="content"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.noteInput,
                  styles.textArea,
                  {
                    height: inputHeight,
                    color: theme === "light" ? "black" : "white",
                    textAlign: textDirection,
                    borderBottomWidth: 0,
                  },
                ]}
                placeholder="یادداشت"
                placeholderTextColor="#A9A9A9"
                multiline
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  noteInput: {
    width: "100%",
    height: 45,
    borderColor: "#A9A9A9",
    borderBottomWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    fontFamily: "Vazir",
    writingDirection: "rtl",
    backgroundColor: "transparent",
  },
  textArea: {
    textAlignVertical: "top",
  },
  addButton: {
    width: 100,
    height: 40,
    backgroundColor: "#6200ea",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Vazir",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-end",
    paddingRight: 5,
  },
});

export default Note;
