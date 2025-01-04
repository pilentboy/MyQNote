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
} from "../../utils/handleLocalStorage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import getCurrentDate from "@/utils/convertToPersianDigits";
import { lightTheme } from "@/constants/theme";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";

const Note = () => {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const router = useRouter();
  const { loading, setLoading, setUserNotes } = useContext(authContext);
  const [inputHeight, setinputHeight] = useState(windowHeight - 200);
  const { id, editedTitle, editedMainContent } = useLocalSearchParams();

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
      alert("editing");
      submitState = false;
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
      alert(editedTitle ? "با موفقیت ویرایش شد" : "افزوده شد!");
      router.navigate("/(home)");
    } else {
      alert(`خطا در ${editedTitle ? "ویرایش" : "ذخیره"} اطلاعات!`);
    }
    setLoading(false);
  };

  return (
    <ScrollView
      style={{ flex: 1, paddingVertical: 5 }}
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
                style={styles.noteInput}
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
                  { height: inputHeight },
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

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                backgroundColor: lightTheme.primaryColor,
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
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    fontFamily: "Vazir",
    textAlign: "right",
    direction: "rtl",
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
