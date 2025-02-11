import { lightTheme } from "@/constants/theme";
import useEdit from "@/context/editProvider";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native";

const EditContainer = ({
  width,
  setTextDirection,
}: {
  setTextDirection?: any;
  width?: any;
}) => {
  return (
    <View
      style={{
        width: width || "100%",
        height: 45,
        backgroundColor: lightTheme.primary,
        borderRadius: 10,
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
      }}
    >
      {setTextDirection && (
        <>
          <MaterialCommunityIcons
            name="format-textdirection-l-to-r"
            size={25}
            color="white"
            onPress={() => setTextDirection("left")}
          />
          <MaterialCommunityIcons
            name="format-textdirection-r-to-l"
            size={25}
            color="white"
            onPress={() => setTextDirection("right")}
          />
        </>
      )}
    </View>
  );
};

export default EditContainer;
