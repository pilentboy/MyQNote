import { View, Text } from "react-native";

const index = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Text style={{ color: "green", fontSize: 20, fontFamily: "Yekan" }}>
        Home
      </Text>
    </View>
  );
};

export default index
