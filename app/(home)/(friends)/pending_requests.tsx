import { View, Text } from "react-native";
import { useContext, useEffect, useState } from "react";
import useTheme from "@/context/themeProvider";
import { authContext } from "@/context/authProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { deleteFriend, fetchPendingRequests } from "@/api";
import CustomScrollView from "@/components/common/CustomScrollView";

export default function PendingRequests() {
  const { theme } = useTheme();
  const { accessKey } = useContext(authContext);
  const [pendingRequests, setPendingRequests] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const showToast = () => {
    Toast.show({
      type: "error",
      text2: "خطا در برقراری ارتباط",
    });
  };

  const handleGetPendingRequests = async () => {
  setLoading(true)
    try {
      const data = await fetchPendingRequests(accessKey);

      if (data.error) {
        showToast();
        return;
      }

      setPendingRequests(data.data);
    } catch (e: any) {
      showToast();
    }
	setLoading(false)
  };

  const handleDeleteFriendRequet = async (friendRequestID: string) => {
    try {
      const data = await deleteFriend(accessKey, {
        friendRequestID: friendRequestID,
      });

      if (data.error) {
        showToast();
        return;
      }

      await handleGetPendingRequests();
    } catch (e: any) {
      showToast();
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
        <CustomScrollView
          setData={handleGetPendingRequests}
          message="لیست درخواست‌های در انتظار تایید خالی است."
		  loading={loading}
        />
      )}
    </View>
  );
}
