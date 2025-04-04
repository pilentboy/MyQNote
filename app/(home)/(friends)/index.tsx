import React, {
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { View, Text } from "react-native";
import useTheme from "@/context/themeProvider";
import FloatingActionButton from "@/components/home/floatingActionButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useForm } from "react-hook-form";
import { authContext } from "@/context/authProvider";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "@/components/formItems/FormInput";
import { darkTheme, lightTheme } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";
import { addFriend, fetchSearchedUsers, fetchSharedNotes } from "@/api";
import CustomScrollView from "@/components/common/CustomScrollView";
import CustomFlatList from "@/components/common/CustomFlatList";
import NoteBox from "@/components/noteBox/noteBox";

export default function Friends() {
  const { theme } = useTheme();
  const [sheetIndex, setSheetIndex] = useState(-1);
  const [messages, setMessages] = useState<any>([]);
  const [usersFound, setUsersFound] = useState<any>([]);
  const [preNoteFlastListPosition, setPreNoteFlastListPosition] =
    useState<number>(0);
  const [addFriendBTNDisplay, setAddFriendBTNDisplay] = useState<boolean>(true);
  const { accessKey, loading, setLoading } = useContext(authContext);

  const snapPoints = useMemo(() => ["65%", "80%"], []);

  const showToast = (type?: string, text?: string) => {
    Toast.show({
      type: type || "error",
      text2: text || "خطا در برقراری ارتباط",
    });
  };

  // log in schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("نام کاربری نمی تواند خالی باشد"),
  });
  const {
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const searchedUsernameValue = watch("username");

  // make an api call for fetching users based on the searchedUsernameValue
  const onSubmit = async () => {
    try {
      const data = await fetchSearchedUsers(accessKey, searchedUsernameValue);

      if (data.error) {
        showToast("error", data.error);
        setUsersFound([]);
        return;
      }

      setUsersFound(data.notes);
    } catch (error: any) {
      showToast();
      console.log(error);
      setUsersFound([]);
    }
  };

  useEffect(() => {
    searchedUsernameValue ? onSubmit() : setUsersFound([]);
  }, [searchedUsernameValue]);

  // add friend request
  const handleAddFriendRequest = async (receiverUsername: string) => {
    try {
      const data = await addFriend(accessKey, {
        receiver_username: receiverUsername,
      });
      if (data.error) {
        showToast("info", data.error);
        return;
      }
      showToast("success", data.message);
    } catch (e: any) {
      showToast();
      console.log(e, "error adding friend ");
    }
  };

  // get shared messages
  const handleGetUserMessages = async () => {
    setLoading(true);
    try {
      const data = await fetchSharedNotes(accessKey);
      if (data.error) {
        showToast("info", data.error);
        return;
      }
      setMessages(data.notes);
    } catch (e: any) {
      showToast();
      console.log(e, "error adding friend ");
    }
    setLoading(false);
  };

  interface NoteItem {
    title: string;
    content: string;
    date: string;
    time: string;
    direction: "right" | "left";
    id: string;
    noOptions?: boolean;
    username: string;
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
        noOptions={true}
        friendName={item.username}
      />
    );
  }, []);

  useEffect(() => {
    handleGetUserMessages();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          backgroundColor: theme === "light" ? "white" : "#222831",
        }}
      >
        {loading ? null : messages.length ? (
          <CustomFlatList
            data={messages}
            renderItem={renderNoteItem}
            setData={handleGetUserMessages}
            preNoteFlastListPosition={preNoteFlastListPosition}
            setPreNoteFlastListPosition={setPreNoteFlastListPosition}
            setAddNoteBTNDisplay={setAddFriendBTNDisplay}
          />
        ) : (
          <CustomScrollView
            setData={handleGetUserMessages}
            message=" هیچ یادداشتی برای شما ارسال نشده است"
          />
        )}

        <BottomSheet
          snapPoints={snapPoints}
          index={sheetIndex}
          onChange={(index) => setSheetIndex(index)}
          onClose={() => setSheetIndex(-1)}
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
              <FormInput
                errors={errors.username}
                name="username"
                placeholder="نام کاربری"
                control={control}
              />

              {usersFound.length && (
                <>
                  <BottomSheetScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingBottom: 20 }}
                  >
                    <View style={{ gap: 5, marginTop: 10 }}>
                      {usersFound.map((user: any) => (
                        <View
                          key={user.id}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderBottomWidth: 1,
                            borderColor: "gray",
                            paddingVertical: 5,
                          }}
                        >
                          <Text style={{ color: "white", fontFamily: "yekan" }}>
                            {user.username}
                          </Text>
                          <MaterialIcons
                            name="person-add-alt-1"
                            size={20}
                            color="green"
                            onPress={() =>
                              handleAddFriendRequest(user.username)
                            }
                          />
                        </View>
                      ))}
                    </View>
                  </BottomSheetScrollView>
                </>
              )}
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
      <FloatingActionButton
        display={addFriendBTNDisplay}
        action={() => setSheetIndex(0)}
        icon={<AntDesign name="adduser" size={24} color="white" />}
      />
    </GestureHandlerRootView>
  );
}
