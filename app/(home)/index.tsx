import { Button, ScrollView, View } from "react-native";
import { useRef, useState } from "react";
import NoteBox from "@/components/noteBox/noteBox";
import HomeBottomSheet from "@/components/homeBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const index = () => {
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [notePara, setNotePara] = useState<string>("");
  const [grid, setGrid] = useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          paddingHorizontal: 10,
        }}
      >
        {/* Main Content */}
        <ScrollView
          contentContainerStyle={{ paddingVertical: 10 }}
          style={{ width: "100%" }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              paddingBottom: "18%",
              flexDirection: "row",
              alignContent: "center",
              flexWrap: "wrap",
              gap: 4,
              direction: "rtl",
            }}
          >
            <NoteBox
              grid={grid}
              title="مصاحبه"
              mainContent="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می "
            />
            <NoteBox
              grid={grid}
              title="مصاحبه"
              mainContent="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می "
            />
            <NoteBox
              grid={grid}
              title="مصاحبه"
              mainContent="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می "
            />
            <NoteBox
              grid={grid}
              title="مصاحبه"
              mainContent="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجلو با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوو با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوه در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می "
            />
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
