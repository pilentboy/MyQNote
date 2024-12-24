import { lightTheme } from "@/constants/theme";
import { View } from "react-native";

const NoteBox = ({ display }: { display: boolean }) => {
  return (
    <View
      style={{
        display: display ? "flex" : "none",
        width: 200,
        height: 200,
        backgroundColor: lightTheme.secondryColor,
        borderRadius: 10,
      }}
    ></View>
  );
};
export default NoteBox;
