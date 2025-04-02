import { View, Text } from "react-native";
import { useContext, useEffect, useState } from "react";
import useTheme from "@/context/themeProvider";
import { lightTheme } from "@/constants/theme";
import { authContext } from "@/context/authProvider";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { acceptFriendRequest, deleteFriend, fetchNotifications } from "@/api";

export default function Notification() {
  const { theme } = useTheme();
  const { accessKey } = useContext(authContext);
  const [notifications, setNotifications] = useState<any>([]);

  const showToast = () => {
    Toast.show({
      type: "error",
      text2: "خطا در برقراری ارتباط",
    });
  };

  const handleGetNotifications = async () => {
    try {
      const data = await fetchNotifications(accessKey);

      if (data.error) {
        showToast();
        return;
      }

      setNotifications(data.notifications);
    } catch (e: any) {
      showToast();
      console.log(e, "error Notification");
    }
  };

  const handleDeleteFriendRequest = async (friendRequestID: string) => {
    try {
      const data = await deleteFriend(accessKey, {
        friendRequestID: friendRequestID,
      });

      if (data.error) {
        showToast();
        return;
      }
      handleGetNotifications();
    } catch (e: any) {
      console.log(e, "error Notification");
    }
  };

  const handleAcceptFriendRequest = async (friendRequestID: string) => {
    try {
      const data = await acceptFriendRequest(accessKey, {
        friendRequestID: friendRequestID,
      });
      if (data.error) {
        console.log(data);
        showToast();
        return;
      }
      await handleGetNotifications();
    } catch (e: any) {
      console.log(e, "error Notification");
    }
  };

  useEffect(() => {
    handleGetNotifications();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: theme === "light" ? "white" : "#222831",
      }}
    >
      {notifications?.length ? (
        notifications.map((notif: any) => (
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
            <Text style={{ color: "white", fontSize: 16 }}>
              {notif.sender_username}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Ionicons
                name="remove-circle-outline"
                size={26}
                color="red"
                onPress={() => handleDeleteFriendRequest(notif.id)}
              />
              <AntDesign
                name="checkcircleo"
                size={24}
                color="green"
                onPress={() => handleAcceptFriendRequest(notif.id)}
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
            هیچ اعلانی ندارید
          </Text>

          <Ionicons
            name="notifications-off-outline"
            size={24}
            color={lightTheme.primary}
          />
        </View>
      )}
    </View>
  );
}
