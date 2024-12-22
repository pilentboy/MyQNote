import { View, Text } from "react-native";

const Loading = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "red" }}>Loading...</Text>
    </View>
  );
};

export default Loading;
