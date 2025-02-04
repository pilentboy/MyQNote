import { ScrollView, View, Text } from "react-native";
import { useContext, useEffect } from "react";
import NoteBox from "@/components/noteBox/noteBox";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Loading from "@/components/loading";
import { authContext } from "@/context/authProvider"; // Context for managing authentication and user data
import { lightTheme } from "@/constants/theme"; // Constants for the light theme colors
import { getLocalStorageData } from "@/utils/handleLocalStorage"; // Utility functions for local storage operations
import AddNoteBTN from "@/components/addNoteBTN"; // Custom button component for adding notes
import { useRouter } from "expo-router";
import useTheme from "@/context/themeProvider"; // Hook for accessing the current theme
import handleGetUsersNotes from "@/api/handleGetUsersNotes";

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

  // Fetch all notes from local storage and set them in state
  const setData = async () => {
    setUserNotes([]);
    setLoading(true);
    if (accessKey || appMode === "online") {
      const res = await handleGetUsersNotes(accessKey);
      setUserNotes(res);
    } else {
      setUserNotes(await getLocalStorageData());
    }
    setLoading(false);
  };

  // display search notes
  const handleSearchingNotes = (filterText: string) => {
    try {
      const searchedNotes = userNotes?.filter((notes: any) =>
        notes.title.includes(filterText)
      );
      return searchedNotes;
    } catch (error) {
      console.error("خطا در فیلتر داده ها :", error);
    }
  };

  // Filter notes based on the search value and update state
  const setSearchNotes = () => {
    setLoading(true);
    setUserNotes(handleSearchingNotes(searchValue)); // Fetch filtered notes
    setLoading(false);
  };

  // Effect: Trigger fetching or filtering notes when `searchValue` changes
  useEffect(() => {
    if (searchValue !== "") {
      setSearchNotes(); // Filter notes
    } else {
      setData(); // Fetch all notes
    }
  }, [searchValue, accessKey]);

  return (
    <GestureHandlerRootView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme === "light" ? "white" : "#222831", // Background color based on theme
          paddingHorizontal: 10,
        }}
      >
        {/* Main Content Area */}
        {loading || !appMode ? (
          <Loading /> // Show loading spinner if `loading` is true
        ) : (
          <ScrollView
            contentContainerStyle={{ paddingVertical: 10 }}
            style={{ width: "100%" }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                paddingBottom: "20%", // Space for floating add note button
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap", // Allow wrapping for note boxes
                gap: 4, // Space between items
                direction: "rtl", // Right-to-left layout
              }}
            >
              {/* Display message if there are no notes, otherwise map through notes */}
              {!userNotes || userNotes.length === 0 ? (
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
                      ? "چیزی پیدا نشد!" // Message if search yields no results
                      : "هیچ یادداشتی نداری!"}
                  </Text>
                </View>
              ) : (
                userNotes?.map((note: any) => (
                  <NoteBox
                    key={note.id}
                    title={note.title}
                    content={note.content}
                    date={note.date}
                    time={note.time}
                    id={note.id}
                  />
                ))
              )}
            </View>
          </ScrollView>
        )}

        {/* Floating button to add a new note */}
        <AddNoteBTN action={() => route.navigate("/(note)")} />
      </View>
    </GestureHandlerRootView>
  );
};

export default index;
