import { useCallback, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { lightTheme } from "@/constants/theme";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "./loading";
import { authContext } from "@/context/authProvider";

const HomeBottomSheet = ({ bottomSheetRef }: { bottomSheetRef: any }) => {
  const { loading, setLoading } = useContext(authContext);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const snapPoints = ["13%", "85%"];

  const renderBackrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={1}
        disappearsOnIndex={0}
        pressBehavior="collapse"
        {...props}
      />
    ),
    []
  );

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
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    console.log(data);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      backgroundStyle={{
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#A9A9A9",
      }}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: "gray" }}
      index={0}
      backdropComponent={renderBackrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <ScrollView style={{ width: "100%", minHeight: 400 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
              width: "100%",
              gap: 5,
              paddingBottom: 10,
            }}
          >
            <Text
              style={{
                color: "gray",
                fontFamily: "Vazir",
                fontSize: 15,
              }}
            >
              نوشتن یادداشت
            </Text>

            <MaterialCommunityIcons name="lead-pencil" size={20} color="gray" />
          </View>
          {loading ? (
            <Loading />
          ) : (
            <View
              style={{
                flex: 1,
                width: "100%",
                height: 400,
                alignItems: "center",
                marginTop: 15,
                gap: 4,
              }}
            >
              {errors.title && (
                <Text
                  style={{
                    color: "red",
                    fontFamily: "Yekan",
                    fontSize: 12,
                    alignSelf: "flex-end",
                    paddingRight: 5,
                  }}
                >
                  {errors.title.message}
                </Text>
              )}
              <Controller
                name="title"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.noteInput, { width: "100%" }]}
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
                <Text
                  style={{
                    color: "red",
                    fontFamily: "Yekan",
                    fontSize: 12,
                    alignSelf: "flex-end",
                    paddingRight: 5,
                  }}
                >
                  {errors.mainContent.message}
                </Text>
              )}
              <Controller
                name="mainContent"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.noteInput,
                      {
                        height: "50%",
                        textAlignVertical: "top",
                        marginVertical: 5,
                      },
                    ]}
                    placeholder="یادداشت"
                    placeholderTextColor="#A9A9A9"
                    numberOfLines={1}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

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
                // bottomSheetRef.current?.collapse()
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontFamily: "Vazir" }}
                >
                  افزودن
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  noteInput: {
    width: "99%",
    height: 45,
    direction: "rtl",
    textAlign: "right",
    color: "black",
    borderColor: "#A9A9A9",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    fontFamily: "Vazir",
  },
});

export default HomeBottomSheet;
