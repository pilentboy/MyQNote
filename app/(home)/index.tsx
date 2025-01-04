import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useContext, useEffect, useRef } from "react";
import NoteBox from "@/components/noteBox/noteBox";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Loading from "@/components/loading";
import { authContext } from "@/context/authProvider";
import { lightTheme } from "@/constants/theme";
import { getLocalStorageData } from "@/utils/handleLocalStorage";
import AddNoteBTN from "@/components/addNoteBTN";
import { useRouter } from "expo-router";

const index = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { loading, setLoading, userNotes, setUserNotes } =
    useContext(authContext);

  const route = useRouter();

  const setData = async () => {
    setLoading(true);
    setUserNotes(await getLocalStorageData());
    setLoading(false);
  };
  useEffect(() => {
    setData();
  }, []);
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
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 4,
                direction: "rtl",
              }}
            >
              {userNotes.length === 0 ? (
                <View
                  style={{
                    height: 400,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: lightTheme.primaryColor,
                      fontSize: 15,
                      fontFamily: "Yekan",
                    }}
                  >
                    هیچ یادداشتی نداری!
                  </Text>
                </View>
              ) : (
                userNotes?.map((note: any) => (
                  <NoteBox
                    key={note.id}
                    title={note.title}
                    mainContent={note.mainContent}
                    date={note.date}
                    time={note.time}
                    id={note.id}
                  />
                ))
              )}
            </View>
          </ScrollView>
        )}

        <AddNoteBTN action={() => route.navigate("/(home)/(note)")} />

        {/* <HomeBottomSheet bottomSheetRef={bottomSheetRef} /> */}
      </View>
    </GestureHandlerRootView>
  );
};

export default index;
