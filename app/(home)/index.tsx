import { Button, View } from "react-native";
import AddNoteBTN from "@/components/addNoteBTN";
import { useRef, useState } from "react";
import NoteBox from "@/components/noteBox";
import HomeBottomSheet from "@/components/homeBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";

const index = () => {
  const [display, setDisplay] = useState<boolean>(false);

  // Create a reference for the BottomSheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Handler to open the BottomSheet
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    console.log("x");
  };
  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
    console.log("x");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <NoteBox display={display} />
      {/* <Button onPress={closeBottomSheet} title="Open Bottom Sheet" /> */}

      {/* <AddNoteBTN action={openBottomSheet} /> */}
      
      <HomeBottomSheet bottomSheetRef={bottomSheetRef} />
    </View>
  );
};

export default index;
