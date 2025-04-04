import { Alert } from "react-native";

const CustomAlert = (title: string, text: string, action: () => void) => {
  Alert.alert(
    title,
    text,
    [
      {
        text: "بله",
        onPress: action,
      },
      {
        text: "خیر",
        onPress: () => console.log("Cancel Pressed"),
      },
    ],
    { cancelable: true }
  );
};

export default CustomAlert;
