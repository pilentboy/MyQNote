import { View, Text } from "react-native";
import { useContext, useEffect, useState } from "react";
import useTheme from "@/context/themeProvider";
import { lightTheme } from "@/constants/theme";
import { authContext } from "@/context/authProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";

export default function PendingRequests() {
  const { theme } = useTheme();
  const { accessKey } = useContext(authContext);
  const [pendingRequests, setPendingRequests] = useState<any>([]);

  const showToast = () => {
    Toast.show({
      type: "error",
      text2: "خطا در برقراری ارتباط",
    });
  };

  const handleGetPendingRequests = async () => {
    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}pending_requests`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.EXPO_PUBLIC_API_KEY || "",
            Authorization: `Bearer ${accessKey}`,
          },
        }
      );

      if (!res.ok) {
        showToast();
        return;
      }
      const data = await res.json();

      setPendingRequests(data.pendingRequests);
    } catch (e: any) {
      showToast();
      console.log(e, "error pending requests");
    }
  };

  const handleDeleteFriendRequet = async (friendRequestID: string) => {

    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}delete_friend_request`,
        {
          method: "DELETE",
          body: JSON.stringify({ friendRequestID: friendRequestID }),
          headers: {
            "Content-Type": "application/json",

            "x-api-key":
            process.env.EXPO_PUBLIC_API_KEY || '',
            Authorization: `Bearer ${accessKey}`,
          },
        }
      );
      if (!res.ok) {
        showToast();
        return;
      }
      await handleGetPendingRequests();
    } catch (e: any) {
      showToast();
      console.log(e, "error Notification");
    }
  };

  useEffect(() => {
    handleGetPendingRequests();
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
      {pendingRequests.length ? (
        pendingRequests.map((notif: any) => (
          <View
            key={notif.id}
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
              {notif.receiver_username}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Ionicons
                name="remove-circle-outline"
                size={26}
                color="red"
                onPress={() => handleDeleteFriendRequet(notif.id)}
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
            لیست درخواست‌های در انتظار تایید خالی است.
          </Text>

          <MaterialIcons
            name="pending-actions"
            size={24}
            color={lightTheme.primary}
          />
        </View>
      )}
    </View>
  );
}
