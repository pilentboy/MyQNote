import { RefreshControl, ScrollView, View, Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import RotateArrow from "@/components/common/RotateArrow";
import { useContext } from "react";
import useTheme from "@/context/themeProvider";
import { lightTheme } from "@/constants/theme";
import { authContext } from "@/context/authProvider";

const CustomScrollView = ({
  setData,
  message,
}: {
  setData: any;
  message: undefined | string;
}) => {
  const { loading } = useContext(authContext);
  const { theme } = useTheme();
  return (
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
          {message}
        </Text>

        <Entypo name="emoji-sad" size={24} color={lightTheme.primary} />
      </View>
    </ScrollView>
  );
};

export default CustomScrollView;
