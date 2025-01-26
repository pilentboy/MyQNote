import { Text, TouchableOpacity } from "react-native";
import { lightTheme } from "@/constants/theme";
const NoteSmallBTN = ({ title, action }: { title: string; action: any }) => {
  return (
    <TouchableOpacity
      style={{
        width: 100,
        height: 40,
        backgroundColor: lightTheme.primary,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
      onPress={action}
    >
      <Text style={{ color: "white", fontSize: 16, fontFamily: "Vazir" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default NoteSmallBTN;
