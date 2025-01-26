import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../../components/loading";
import { authContext } from "@/context/authProvider";
import {
  getLocalStorageData,
  storeDataInLocalStorage,
  handleEditingNote,
  handleDeleteNote,
} from "../../utils/handleLocalStorage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import getCurrentDate from "@/utils/convertToPersianDigits";
import { lightTheme } from "@/constants/theme";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import useTheme from "@/context/themeProvider";
import Toast from "react-native-toast-message";

const Note = () => {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const router = useRouter();
  const { loading, setLoading, setUserNotes } = useContext(authContext);
  const [inputHeight, setinputHeight] = useState(windowHeight - 200);
  const { id, editedTitle, editedMainContent } = useLocalSearchParams();
  const { theme } = useTheme();

  const showToast = () => {
    Toast.show({
      type: "success",
      // text1: 'Hello',
      text2: "با موفقیت افزوده شده",
    });
  };
  useEffect(() => {
    if (editedTitle) {
      navigation.setOptions({ title: "ویرایش" });
    }
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setinputHeight(250)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setinputHeight(windowHeight - 200)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .max(20, "حداکثر 20 کاراکتر برای عنوان مجاز می باشد.")
      .required("عنوان نمی تواند خالی باشد"),
    mainContent: Yup.string().required("یادداشت نمی تواند خالی باشد"),
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
      mainContent: editedMainContent?.toString() || "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    let submitState: boolean | undefined;
    setLoading(true);
    if (editedTitle) {
      submitState = await handleEditingNote({
        id,
        editedTitle: data.title,
        editedMainContent: data.mainContent,
      });
    } else {
      submitState = await storeDataInLocalStorage({
        ...data,
        id: uuidv4(),
        date: getCurrentDate()[0],
        time: getCurrentDate()[1],
      });
    }

    if (submitState) {
      setUserNotes(await getLocalStorageData());
      reset();
      clearErrors();
      // alert(editedTitle ? "با موفقیت ویرایش شد" : "افزوده شد!");
      showToast();
      router.replace("/(home)");
    } else {
      alert(`خطا در ${editedTitle ? "ویرایش" : "ذخیره"} اطلاعات!`);
    }
    setLoading(false);
  };

  const deleteNote = async () => {
    console.log("deleting");
    const result = await handleDeleteNote(id);
    if (result) {
      setUserNotes(await getLocalStorageData());
      alert("با موفقیت حذف شد");
      router.replace("/(home)");
    } else {
      alert("خطا در حذف نوت");
    }
  };

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
                  { color: theme === "light" ? "black" : "white" },
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
          {errors.mainContent && (
            <Text style={styles.errorText}>{errors.mainContent.message}</Text>
          )}
          <Controller
            name="mainContent"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.noteInput,
                  styles.textArea,
                  {
                    height: inputHeight,
                    color: theme === "light" ? "black" : "white",
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

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                backgroundColor: lightTheme.primary,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
              onPress={handleSubmit(onSubmit)}
            >
              <Text
                style={{ color: "white", fontSize: 16, fontFamily: "Vazir" }}
              >
                {editedTitle ? "ثبت ویرایش" : "افزودن"}
              </Text>
            </TouchableOpacity>

            {editedTitle && (
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 40,
                  backgroundColor: lightTheme.primary,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
                onPress={() => deleteNote()}
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontFamily: "Vazir" }}
                >
                  حذف
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    height: 400,
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
  },
  noteInput: {
    width: "100%",
    height: 45,
    borderColor: "#A9A9A9",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    fontFamily: "Vazir",
    textAlign: "right",
    direction: "rtl",
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
