import { lightTheme } from "@/constants/theme";
import { View, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FooterText from "./footerText";
import { useState } from "react";
const NoteBox = ({
  title,
  mainContent,
  grid = true,
}: {
  grid: boolean;
  title: string;
  mainContent: string;
}) => {
  const [displayFullContent, setDisplayFullContent] = useState<boolean>(false);
  return (
    <View
      style={[
        {
          display: "flex",
          backgroundColor: lightTheme.secondryColor,
          borderRadius: 10,
          padding: 8,
          width: grid ? "49%" : "100%",
          height: displayFullContent || grid ? "auto" : 120,
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
          paddingBottom: 4,
        }}
      >
        <Text
          style={{
            color: "black",
            fontFamily: "Vazir",
            fontWeight: "bold",
            fontSize: 16,
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
      <Pressable onPress={() => setDisplayFullContent((pre) => !pre)}>
        <Text
          style={{
            color: "black",
            fontFamily: "Vazir",
            fontSize: 14,
            borderBottomWidth: 1,
            borderBottomColor: "#e7ce8e",
            paddingVertical: 5,
          }}
        >
          {displayFullContent || grid
            ? mainContent
            : mainContent
                .replace(/\s+/g, " ")
                .slice(0, mainContent.length > 80 ? 80 : mainContent.length)}
          {mainContent.length > 100 ? "..." : null}
        </Text>
      </Pressable>

      {/* details -- edited or added time info */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          direction: "rtl",
          gap: 2,
          paddingTop: 4,
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
