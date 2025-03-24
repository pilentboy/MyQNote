import { View, Text } from "react-native";
import { useContext, useEffect, useState } from "react";
import useTheme from "@/context/themeProvider";
import { lightTheme } from "@/constants/theme";
import { authContext } from "@/context/authProvider";
import AntDesign from "@expo/vector-icons/AntDesign";
import Toast from "react-native-toast-message";
import Entypo from "@expo/vector-icons/Entypo";

export default function UserFriends() {
  const { theme } = useTheme();
  const { accessKey } = useContext(authContext);
  const [userFriends, setUserFriends] = useState<any>([]);

  const showToast = () => {
    Toast.show({
      type: "error",
      text2: "خطا در برقراری ارتباط",
    });
  };

  const handleGetUsersFriends = async () => {
    try {
      const res = await fetch(`https://myqnoteapi.liara.run/user_friends`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "shYqiZ7vc4?QoiatSIOA9MHMxOsBW2Wckzc5GAsO3xvzkUVr/24zxssYdAOlta-5/lKBdOb0Q3hW7ClRsrgAX?kmQa8-o9qfpwUhP7v/CR8St!wO5VanxxjZ12gG2CHi",
          Authorization: `
		   Bearer ${accessKey}`,
        },
      });

      if (!res.ok) {
        setUserFriends([]);
        showToast();
        return;
      }

      const data = await res.json();
      console.log(data.userFriends, "xxx");

      setUserFriends(data.userFriends);
    } catch (error: any) {
      showToast();
      console.log(error);
      setUserFriends([]);
    }
  };

  const handleDeleteFriendRequet = async (friendRequestID: string) => {
    try {
      const res = await fetch(
        "https://myqnoteapi.liara.run/delete_friend_request",
        {
          method: "DELETE",
          body: JSON.stringify({ friendRequestID: friendRequestID }),
          headers: {
            "Content-Type": "application/json",

            "x-api-key":
              "shYqiZ7vc4?QoiatSIOA9MHMxOsBW2Wckzc5GAsO3xvzkUVr/24zxssYdAOlta-5/lKBdOb0Q3hW7ClRsrgAX?kmQa8-o9qfpwUhP7v/CR8St!wO5VanxxjZ12gG2CHi",
            Authorization: `Bearer ${accessKey}`,
          },
        }
      );
      await handleGetUsersFriends();
    } catch (e: any) {
      console.log(e, "error Notification");
    }
  };

  useEffect(() => {
    handleGetUsersFriends();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: theme === "light" ? "white" : "#222831",
        gap: 8,
      }}
    >
      {userFriends.length ? (
        userFriends.map((friend: any) => (
          <View
            key={friend.id}
            style={{
              width: "100%",
              height: 45,
              padding: 8,
              borderRadius: 10,
              borderColor: "gray",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1,
            }}
          >
            <Text
              style={{
                color: theme == "light" ? "black" : "white",
                fontSize: 16,
              }}
            >
              {friend.friend_username}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <AntDesign
                name="deleteuser"
                size={24}
                color="red"
                onPress={() => handleDeleteFriendRequet(friend.id)}
              />
            </View>
          </View>
        ))
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
            لیست دوستان شما خالی است.
          </Text>

          <Entypo name="emoji-sad" size={24} color={lightTheme.primary} />
        </View>
      )}
    </View>
  );
}
