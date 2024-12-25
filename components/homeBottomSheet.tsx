import React, { useCallback } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { lightTheme } from "@/constants/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const HomeBottomSheet = ({ bottomSheetRef }: any) => {
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const snapPoints = ["14%", "50%"];

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

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "#EEEDEB" }}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: "gray" }}
        index={0}
        backdropComponent={renderBackrop}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: 5,
            }}
          >
            <Text
              style={{
                color: "gray",
                fontFamily: "Yekan",
                fontSize: 16,
              }}
            >
              نوشتن
            </Text>
            <MaterialCommunityIcons name="lead-pencil" size={20} color="gray" />
          </View>
          <View
            style={{
              height: "80%",
              width: "100%",
              alignItems: "center",
              gap: 5,
              marginTop: 15,
            }}
          >
            <TextInput
              style={styles.noteTitleInput}
              placeholder="عنوان"
              placeholderTextColor="white"
              multiline={true}
              numberOfLines={10}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center",
    borderColor: "red",
  },
  noteTitleInput: {
    width: "86%",
    height: 45,
    direction: "rtl",
    padding: 0,
    textAlign: "right",
    color: "white",
    backgroundColor: lightTheme.primaryColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 15,
    fontFamily: "Yekan",
  },
});

export default HomeBottomSheet;
