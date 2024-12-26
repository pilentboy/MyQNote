import { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { lightTheme } from "@/constants/theme";

const HomeBottomSheet = ({
  bottomSheetRef,
  notePara,
  noteTitle,
  setNoteTitle,
  setNotePara,
}: {
  bottomSheetRef: any;
  notePara: string;
  noteTitle: string;
  setNotePara: (title: string) => void;
  setNoteTitle: (title: string) => void;
}) => {
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const snapPoints = ["14%", "85%"];

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
        backgroundStyle={{
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#A9A9A9",
        }}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: "gray" }}
        index={0}
        // backdropComponent={renderBackrop}
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

              <MaterialCommunityIcons
                name="lead-pencil"
                size={20}
                color="gray"
              />
            </View>
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
              <TextInput
                style={[styles.noteInput, { width: "100%" }]}
                placeholder="عنوان"
                placeholderTextColor="#A9A9A9"
                numberOfLines={1}
                value={noteTitle}
                onChangeText={(value) => setNoteTitle(value)}
              />
              <TextInput
                style={[
                  styles.noteInput,
                  {
                    height: "50%",
                    textAlignVertical: "top",
                    marginVertical: 5,
                  },
                ]}
                placeholder="یادداشت..."
                placeholderTextColor="#A9A9A9"
                multiline
                value={notePara}
                onChangeText={(value) => setNotePara(value)}
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
                onPress={() => bottomSheetRef.current?.collapse()}
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontFamily: "Vazir" }}
                >
                  افزودن
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
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
