import { View, Text, FlatList, RefreshControl, ScrollView } from "react-native";
import { useCallback, useContext, useEffect, useState, useMemo } from "react";
import NoteBox from "@/components/noteBox/noteBox";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Loading from "@/components/loading";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { authContext } from "@/context/authProvider"; // Context for managing authentication and user data
import { lightTheme, darkTheme } from "@/constants/theme"; // Constants for the light theme colors
import { getLocalStorageUserNotes } from "@/utils/handleLocalStorage"; // Utility functions for local storage operations
import FloatingActionButton from "@/components/home/floatingActionButton"; // Custom button component for adding notes
import { useRouter } from "expo-router";
import useTheme from "@/context/themeProvider"; // Hook for accessing the current theme
import handleGetUserCloudNotes from "@/api/handleGetUserCloudNotes";
import handleSearchingNotes from "@/utils/handleSearchingNotes";
import Toast from "react-native-toast-message";
import RotateArrow from "@/components/rotateArrow";
import Entypo from "@expo/vector-icons/Entypo";
import useEdit from "@/context/editProvider";
import useSubmitNoteType from "@/context/submitNoteTypeProvider";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";

const index = () => {
  const {
    loading,
    setLoading,
    userNotes,
    setUserNotes,
    searchValue,
    accessKey,
    appMode,
    setHomeBottomSheetDisplay,
    homeBottomSheetDisplay,
    setSharingNoteID,
    sharingNoteID,
  } = useContext(authContext);

  const route = useRouter();
  const { theme } = useTheme();
  const { textDirection, setTextDirection } = useEdit();
  const { setSubmitNoteType } = useSubmitNoteType();

  const [preNoteFlastListPosition, setPreNoteFlastListPosition] =
    useState<number>(0);
  const [addNoteBTNDisplay, setAddNoteBTNDisplay] = useState<boolean>(true);
  const [originalUserNotes, setOriginalUserNotes] = useState([]);
  const [userFriends, setUserFriends] = useState<any>();
  const [sheetIndex, setSheetIndex] = useState(-1);

  const snapPoints = useMemo(() => ["65%"], []);
  const showToast = (type?: string, message?: string) => {
    Toast.show({
      type: type || "error",
      text2: message || "خطا در برقراری ارتباط",
    });
  };

  // Fetch all notes from local/cloud storage and set them in state
  const setData = async () => {
    setUserNotes([]);
    setTextDirection(undefined);
    setLoading(true);
    if (appMode === "online" && accessKey) {
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
    } else if (!textDirection) {
      originalUserNotes.length ? setUserNotes(originalUserNotes) : setData(); // Fetch all notes
    } else {
      if (textDirection !== undefined && originalUserNotes.length)
        filterNotesRotation();
    } // Fetch all notes
  }, [searchValue, accessKey, textDirection]);

  const filterNotesRotation = () => {
    setUserNotes(
      originalUserNotes.filter((note: any) => note.direction === textDirection)
    );
  };

  interface NoteItem {
    title: string;
    content: string;
    date: string;
    time: string;
    direction: "right" | "left";
    id: string;
  }

  const renderNoteItem = useCallback(({ item }: { item: NoteItem }) => {
    return (
      <NoteBox
        title={item.title}
        content={item.content}
        date={item.date}
        time={item.time}
        direction={item.direction}
        id={item.id}
      />
    );
  }, []);

  interface ItemLayout {
    length: number;
    offset: number;
    index: number;
  }

  const getItemLayout = (_: any, index: number): ItemLayout => ({
    length: 120,
    offset: 120 * index,
    index,
  });

  const handleShareNote = async (friendUsername: string) => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}share_note`, {
        method: "POST",
        body: JSON.stringify({
          sharingNoteID,
          friendUsername,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.EXPO_PUBLIC_API_KEY || "",
          Authorization: `
		   Bearer ${accessKey}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        showToast("info", data.error);
        return;
      }

      const data = await res.json();

      console.log(data);
    } catch (error: any) {
      showToast();
      console.log(error);
    }
  };

  const handleGetUsersFriends = async () => {
    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}user_friends`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.EXPO_PUBLIC_API_KEY || "",
            Authorization: `
		   Bearer ${accessKey}`,
          },
        }
      );

      if (!res.ok) {
        setUserFriends([]);
        showToast();
        return;
      }

      const data = await res.json();

      setUserFriends(data.userFriends);
    } catch (error: any) {
      showToast();
      console.log(error);
      setUserFriends([]);
    }
  };

  useEffect(() => {
    setUserFriends(undefined);
    if (homeBottomSheetDisplay !== -1) {
      handleGetUsersFriends();
    }
  }, [homeBottomSheetDisplay]);

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
                renderItem={renderNoteItem}
                maxToRenderPerBatch={6}
                initialNumToRender={6}
                windowSize={10}
                removeClippedSubviews={true}
                getItemLayout={getItemLayout}
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
        <FloatingActionButton
          display={addNoteBTNDisplay}
          action={() => {
            setSubmitNoteType("newNote");
            route.navigate("/(note)");
          }}
          icon={<FontAwesome6 name="pencil" size={24} color="white" />}
        />
      </View>

      <BottomSheet
        snapPoints={snapPoints}
        index={homeBottomSheetDisplay}
        onChange={(index) => setHomeBottomSheetDisplay(index)}
        onClose={() => {
          setSharingNoteID(undefined);
          setHomeBottomSheetDisplay(-1);
        }}
        enablePanDownToClose
        handleStyle={{ backgroundColor: lightTheme.primary }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
      >
        <BottomSheetView
          style={{
            flex: 1,
            padding: 15,
            alignItems: "center",
            gap: 4,
            backgroundColor: theme === "light" ? "white" : darkTheme.primary,
          }}
        >
          <View style={{ flex: 1 }}>
            {!userFriends ? null : userFriends.length ? (
              <>
                <BottomSheetScrollView
                  style={{ flex: 1 }}
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  <View style={{ gap: 5, marginTop: 10, alignItems: "center" }}>
                    <SimpleLineIcons name="share" size={16} color="black" />
                    {userFriends.map((user: any) => (
                      <View
                        key={user.id}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderBottomWidth: 1,
                          borderColor: "gray",
                          paddingVertical: 5,
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            color: theme === "light" ? "black" : "white",
                            fontFamily: "yekan",
                          }}
                        >
                          {user.friend_username}
                        </Text>
                        <Ionicons
                          name="send-outline"
                          size={24}
                          color={"gray"}
                          onPress={() => handleShareNote(user.friend_username)}
                        />
                      </View>
                    ))}
                  </View>
                </BottomSheetScrollView>
              </>
            ) : (
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
                  هیچ دوستی برای اشتراک پیدا نشد
                </Text>

                <Entypo name="emoji-sad" size={24} color={lightTheme.primary} />
                <Text
                  style={{
                    color: "gray",
                    textAlign: "center",
                    fontSize: 13,
                    fontFamily: "Yekan",
                  }}
                >
                  می توانید از طریق صفحه دوستان نسبت به افزودن دوستان اقدام کنید
                </Text>
              </View>
            )}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default index;
