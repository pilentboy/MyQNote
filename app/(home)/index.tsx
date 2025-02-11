import { View, Text, FlatList, RefreshControl, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import NoteBox from "@/components/noteBox/noteBox";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Loading from "@/components/loading";
import { authContext } from "@/context/authProvider"; // Context for managing authentication and user data
import { lightTheme } from "@/constants/theme"; // Constants for the light theme colors
import { getLocalStorageUserNotes } from "@/utils/handleLocalStorage"; // Utility functions for local storage operations
import AddNoteBTN from "@/components/home/addNoteBTN"; // Custom button component for adding notes
import { useRouter } from "expo-router";
import useTheme from "@/context/themeProvider"; // Hook for accessing the current theme
import handleGetUserCloudNotes from "@/api/handleGetUserCloudNotes";
import handleSearchingNotes from "@/utils/handleSearchingNotes";
import Toast from "react-native-toast-message";
import RotateArrow from "@/components/rotateArrow";
import Entypo from "@expo/vector-icons/Entypo";
import useEdit from "@/context/editProvider";

const index = () => {
  const {
    loading,
    setLoading,
    userNotes,
    setUserNotes,
    searchValue,
    accessKey,
    appMode,
  } = useContext(authContext);

  const route = useRouter();
  const { theme } = useTheme();
  const { textDirection, setTextDirection } = useEdit();

  const [preNoteFlastListPosition, setPreNoteFlastListPosition] =
    useState<number>(0);
  const [addNoteBTNDisplay, setAddNoteBTNDisplay] = useState<boolean>(true);
  const [originalUserNotes, setOriginalUserNotes] = useState([]);

  const showToast = () => {
    Toast.show({
      type: "error",
      text2: "خطا در برقراری ارتباط",
    });
  };

  // Fetch all notes from local storage and set them in state
  const setData = async () => {
    setUserNotes([]);
    setTextDirection(undefined);
    setLoading(true);
    if (accessKey) {
      try {
        const res = await handleGetUserCloudNotes(accessKey);
        if (res.message || res.error) {
          showToast();
          setUserNotes([]);
        } else {
          setUserNotes(res);
          setOriginalUserNotes(res); // Set original notes
        }
      } catch (error) {
        showToast();
      }
    } else {
      const localNotes = await getLocalStorageUserNotes();
      setUserNotes(localNotes);
      setOriginalUserNotes(localNotes); // Set original notes
    }
    setLoading(false);
  };

  // Filter notes based on the search value and update state
  const setSearchNotes = () => {
    setUserNotes(handleSearchingNotes(userNotes, searchValue)); // Fetch filtered notes
  };

  // Effect: Trigger fetching or filtering notes when `searchValue` changes
  useEffect(() => {
    if (searchValue !== "") {
      setSearchNotes(); // Filter notes
    } else {
      setData(); // Fetch all notes
    }
  }, [searchValue, accessKey]);

  const filterNotesRotation = () => {
    setUserNotes(
      originalUserNotes.filter((note: any) => note.direction === textDirection)
    );
  };

  useEffect(() => {
    if (textDirection !== undefined && userNotes.length) filterNotesRotation();
  }, [textDirection]);

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
        {/* Main Content Area */}
        {loading || !appMode ? (
          <Loading /> // Show loading spinner if `loading` is true
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            {/* Display message if there are no notes, otherwise map through notes */}
            {!userNotes || userNotes.length === 0 ? (
              <ScrollView
                contentContainerStyle={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
                refreshControl={
                  <RefreshControl refreshing={loading} onRefresh={setData}>
                    <RotateArrow />
                  </RefreshControl>
                }
              >
                <View
                  style={{
                    height: 400,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                    flex: 1,
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
                      ? "چیزی پیدا نشد!" // Message if search yields no results
                      : "هیچ یادداشتی نداری!"}
                  </Text>

                  <Entypo
                    name="emoji-sad"
                    size={24}
                    color={lightTheme.primary}
                  />
                </View>
              </ScrollView>
            ) : (
              // Display notes if there are any in the state

              <FlatList
                data={userNotes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <NoteBox
                    title={item.title}
                    content={item.content}
                    date={item.date}
                    time={item.time}
                    direction={item.direction}
                    id={item.id}
                  />
                )}
                refreshControl={
                  <RefreshControl refreshing={loading} onRefresh={setData}>
                    <RotateArrow />
                  </RefreshControl>
                }
                contentContainerStyle={{
                  paddingVertical: 8,
                  gap: 4,
                }}
                onScroll={(e: any) => {
                  const currentPositon = e.nativeEvent.contentOffset.y;

                  setPreNoteFlastListPosition(currentPositon);

                  if (
                    currentPositon > preNoteFlastListPosition &&
                    currentPositon > 50
                  ) {
                    setAddNoteBTNDisplay(false);
                  } else {
                    setAddNoteBTNDisplay(true);
                  }
                }}
              />
            )}
          </View>
        )}

        {/* Floating button to add a new note */}
        <AddNoteBTN
          display={addNoteBTNDisplay}
          action={() => route.navigate("/(note)")}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default index;
