import { ScrollView, View, Text } from "react-native";
import { useContext, useEffect } from "react";
import NoteBox from "@/components/noteBox/noteBox";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Loading from "@/components/loading";
import { authContext } from "@/context/authProvider";
import { lightTheme } from "@/constants/theme";
import {
  getLocalStorageData,
  handleFilterLocalStorageNote,
} from "@/utils/handleLocalStorage";
import AddNoteBTN from "@/components/addNoteBTN";
import { useRouter } from "expo-router";
import useTheme from "@/context/themeProvider";

const index = () => {
  const { loading, setLoading, userNotes, setUserNotes, searchValue } =
    useContext(authContext);

  const route = useRouter();

  const { theme } = useTheme();

  // set all notes from local storage
  const setData = async () => {
    setLoading(true);
    setUserNotes(await getLocalStorageData());
    setLoading(false);
  };

  // filter data based on the search value
  const setSearchNotes = async () => {
    setLoading(true);
    setUserNotes(await handleFilterLocalStorageNote(searchValue));
    setLoading(false);
  };

  useEffect(() => {
    if (searchValue !== "") {
      setSearchNotes();
    } else {
      setData();
    }
  }, [searchValue]);

  return (
    <GestureHandlerRootView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme === "light" ? "white" : "#222831",
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
                      color: theme === "light" ? lightTheme.primary : "white",
                      fontSize: 15,
                      fontFamily: "Yekan",
                    }}
                  >
                    {searchValue !== ""
                      ? "چیزی پیدا نشد!"
                      : "هیچ یادداشتی نداری!"}
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

        <AddNoteBTN action={() => route.navigate("/(note)")} />
      </View>
    </GestureHandlerRootView>
  );
};

export default index;
