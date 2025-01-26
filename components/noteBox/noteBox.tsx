import { lightTheme } from "@/constants/theme";
import { View, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FooterText from "./footerText";
import { useState } from "react";
import { useRouter } from "expo-router";
import useTheme from "@/context/themeProvider";

const NoteBox = ({
  title,
  mainContent,
  date,
  time,
  id,
}: {
  title: string;
  mainContent: string;
  date: string;
  time: string;
  id: string;
}) => {
  const route = useRouter();
  const { theme } = useTheme();
  const [displayFullContent, setDisplayFullContent] = useState<boolean>(false);

  return (
    <View
      style={[
        {
          display: "flex",
          backgroundColor: theme === "light" ? lightTheme.secondry : "#2C394B",
          borderRadius: 10,
          justifyContent: "space-around",
          padding: 6,
          width: "100%",
          height: displayFullContent ? "auto" : 120,
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
          borderBottomColor: theme === "light" ? "#e7ce8e" : "gray",
          paddingBottom: 4,
        }}
      >
        <Text
          style={{
            color: theme == "light" ? "black" : "white",
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
          color={theme == "light" ? "black" : "white"}
          onPress={() =>
            route.push({
              pathname: "/(note)",
              params: {
                id: id,
                editedTitle: title,
                editedMainContent: mainContent,
              },
            })
          }
        />
      </View>
      {/* main content */}
      <Pressable onPress={() => setDisplayFullContent((pre) => !pre)}>
        <Text
          style={{
            color: theme === "light" ? "black" : "white",
            fontFamily: "Vazir",
            fontSize: 14,
            borderBottomWidth: 1,
            borderBottomColor: theme === "light" ? "#e7ce8e" : "gray",
            paddingVertical: 5,
          }}
        >
          {displayFullContent
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
          justifyContent: "flex-end",
          direction: "rtl",
          gap: 2,
          paddingTop: 4,
        }}
      >
        <FooterText value={time} />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: theme == "light" ? "black" : "white",
          }}
        >
          |
        </Text>
        <FooterText value={date} />
      </View>
    </View>
  );
};
export default NoteBox;
