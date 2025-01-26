import { ScrollView, View, Text } from "react-native"; // Core components for building UI
import { useContext, useEffect } from "react"; // React hooks for state and lifecycle management
import NoteBox from "@/components/noteBox/noteBox"; // Custom component for displaying individual notes
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Provides a root view for handling gestures
import Loading from "@/components/loading"; // Custom loading spinner component
import { authContext } from "@/context/authProvider"; // Context for managing authentication and user data
import { lightTheme } from "@/constants/theme"; // Constants for the light theme colors
import {
  getLocalStorageData,
  handleFilterLocalStorageNote,
} from "@/utils/handleLocalStorage"; // Utility functions for local storage operations
import AddNoteBTN from "@/components/addNoteBTN"; // Custom button component for adding notes
import { useRouter } from "expo-router"; // Router for navigation
import useTheme from "@/context/themeProvider"; // Hook for accessing the current theme

const index = () => {
  // Extracting state and functions from the authentication context
  const { loading, setLoading, userNotes, setUserNotes, searchValue } =
    useContext(authContext);

  const route = useRouter(); // Router instance for navigation
  const { theme } = useTheme(); // Accessing the current theme (light or dark)

  // Fetch all notes from local storage and set them in state
  const setData = async () => {
    setLoading(true); // Start loading
    setUserNotes(await getLocalStorageData()); // Fetch notes and update state
    setLoading(false); // End loading
  };

  // Filter notes based on the search value and update state
  const setSearchNotes = async () => {
    setLoading(true); // Start loading
    setUserNotes(await handleFilterLocalStorageNote(searchValue)); // Fetch filtered notes
    setLoading(false); // End loading
  };

  // Effect: Trigger fetching or filtering notes when `searchValue` changes
  useEffect(() => {
    if (searchValue !== "") {
      setSearchNotes(); // Filter notes
    } else {
      setData(); // Fetch all notes
    }
  }, [searchValue]); // Dependency: Executes when `searchValue` changes

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
        {loading ? (
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
                      color: theme === "light" ? lightTheme.primary : "white", // Text color based on theme
                      fontSize: 15,
                      fontFamily: "Yekan", // Custom font
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
                    key={note.id} // Unique key for each note
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

        {/* Floating button to add a new note */}
        <AddNoteBTN action={() => route.navigate("/(note)")} />
      </View>
    </GestureHandlerRootView>
  );
};

export default index;
