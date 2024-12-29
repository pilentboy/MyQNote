import { ScrollView, View } from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import NoteBox from "@/components/noteBox/noteBox";
import HomeBottomSheet from "@/components/homeBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getData } from "@/utils/handleLocalStorage";
import Loading from "@/components/loading";
import { authContext } from "@/context/authProvider";


const index = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [notes, setNotes] = useState<any>(null);
  const { loading, setLoading, updatingNotes, setUpdatingNotes } =
    useContext(authContext);

  const setDataLocal = async () => {
    setLoading(true);
    setNotes(await getData());
    setLoading(false);
    setUpdatingNotes(false);
  };

  useEffect(() => {
    updatingNotes ? setDataLocal() : null;
  }, [updatingNotes]);

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
        {loading ? (
          <Loading />
        ) : (
          <ScrollView
            contentContainerStyle={{ paddingVertical: 10 }}
            style={{ width: "100%" }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                paddingBottom: "20%",
                flexDirection: "row",
                alignContent: "center",
                flexWrap: "wrap",
                gap: 4,
                direction: "rtl",
              }}
            >
              {notes?.map((value: any) => (
                <NoteBox
                  key={value.id}
                  title={value.title}
                  mainContent={value.mainContent}
                />
              ))}
            </View>
          </ScrollView>
        )}

        <HomeBottomSheet bottomSheetRef={bottomSheetRef} />
      </View>
    </GestureHandlerRootView>
  );
};

export default index;
