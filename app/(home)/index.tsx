import { Button, View } from "react-native";
import AddNoteBTN from "@/components/addNoteBTN";
import { useRef, useState } from "react";
import NoteBox from "@/components/noteBox";
import HomeBottomSheet from "@/components/homeBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";

const index = () => {
  const [display, setDisplay] = useState<boolean>(true);
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [notePara, setNotePara] = useState<string>("");

  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      {/* Main Content */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NoteBox display={display} />
      </View>
      <HomeBottomSheet
        bottomSheetRef={bottomSheetRef}
        noteTitle={noteTitle}
        setNoteTitle={setNoteTitle}
        setNotePara={setNotePara}
        notePara={notePara}
      />
    </View>
  );
};

export default index;
