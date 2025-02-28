import React, { useMemo, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import useTheme from "@/context/themeProvider";
import FloatingActionButton from "./../../components/home/floatingActionButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "@/components/formItems/formInput";
import CustomLinearGradient from "@/components/linearGradient";
import { darkTheme, lightTheme } from "@/constants/theme";

export default function Friends() {
  const { setTheme, theme } = useTheme();
  const [sheetIndex, setSheetIndex] = useState(-1); // State to control the sheet index

  const snapPoints = useMemo(() => ["65%"], []);

  // log in schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("نام کاربری نمی تواند خالی باشد"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FloatingActionButton
          display={true}
          action={() => setSheetIndex(0)}
          icon={<AntDesign name="adduser" size={24} color="white" />}
        />

        <BottomSheet
          snapPoints={snapPoints}
          index={sheetIndex}
          onChange={(index) => setSheetIndex(index)}
          onClose={() => setSheetIndex(-1)}
          enablePanDownToClose
          handleStyle={{ backgroundColor: lightTheme.primary }}
          handleIndicatorStyle={{ backgroundColor: "white" }}
        >
          <BottomSheetView
            style={{
              flex: 1,
              padding: 36,
              alignItems: "center",
              backgroundColor: theme === "light" ? "white" : darkTheme.primary,
            }}
          >
            <View style={{ flex: 1 }}>
              <FormInput
                errors={errors.username}
                name="username"
                placeholder="نام کاربری"
                control={control}
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
