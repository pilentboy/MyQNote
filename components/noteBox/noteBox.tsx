import { lightTheme } from "@/constants/theme";
import { View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FooterText from "./footerText";
const NoteBox = ({
  title,
  mainContent,
  grid = true,
}: {
  grid: boolean;
  title: string;
  mainContent: string;
}) => {
  return (
    <View
      style={[
        {
          display: "flex",
          backgroundColor: lightTheme.secondryColor,
          borderRadius: 10,
          padding: 10,
          width: grid ? "49%" : "100%",
          height: grid ? "auto" : 120,
          overflow: "hidden",
        },
      ]}
    >
      {/*  title & edit  */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor: "#e7ce8e",
          paddingBottom: 5,
        }}
      >
        <Text
          style={{
            color: "black",
            fontFamily: "Vazir",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {title}
        </Text>
        <MaterialIcons
          name="edit"
          size={16}
          color="black"
          onPress={() => alert("not ready!")}
        />
      </View>
      {/* main content */}
      <Text
        style={{
          color: "black",
          fontFamily: "Vazir",
          fontSize: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#e7ce8e",
          paddingVertical: 5,
        }}
      >
        {grid
          ? mainContent
          : mainContent.slice(
              0,
              mainContent.length > 100 ? 100 : mainContent.length
            )}
        {mainContent.length > 100 ? "..." : null}
      </Text>
      {/* more info */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          direction: "rtl",
          gap: 2,
          paddingVertical: 4,
        }}
      >
        <FooterText value="10:45" />
        <Text style={{ color: "black", fontWeight: "bold", fontSize: 14 }}>
          |
        </Text>
        <FooterText value="1403/12/10" />
      </View>
    </View>
  );
};
export default NoteBox;
