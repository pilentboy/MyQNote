import { Button, ScrollView, View } from "react-native";
import { useRef, useState } from "react";
import NoteBox from "@/components/noteBox";
import HomeBottomSheet from "@/components/homeBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const index = () => {
  const [display, setDisplay] = useState<boolean>(true);
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [notePara, setNotePara] = useState<string>("");

  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        {/* Main Content */}
        <ScrollView
          contentContainerStyle={{ paddingVertical: 10 }}
          style={{ width: "100%" }}
        >
          <View style={{ flex: 1, alignItems: "center", paddingBottom: 70 }}>
            <NoteBox viewType="grid" />
            <NoteBox viewType="grid" />
          </View>
        </ScrollView>

        <HomeBottomSheet
          bottomSheetRef={bottomSheetRef}
          noteTitle={noteTitle}
          setNoteTitle={setNoteTitle}
          setNotePara={setNotePara}
          notePara={notePara}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default index;
