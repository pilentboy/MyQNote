import { lightTheme } from "@/constants/theme";
import { View, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FooterText from "./footerText";
import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import useTheme from "@/context/themeProvider";
import useSubmitNoteType from "@/context/submitNoteTypeProvider";

const NoteBox = ({
  title,
  content,
  date,
  time,
  id,
  direction,
}: {
  title: string;
  content: string;
  date: string;
  time: string;
  id: string;
  direction: "right" | "left";
}) => {
  const route = useRouter();
  const { theme } = useTheme();
  const { setSubmitNoteType } = useSubmitNoteType();
  const [displayFullContent, setDisplayFullContent] = useState<boolean>(false);
  let isLongPress = true;

  // handle log touch on note box
  const touchStart = () => {
    console.log("start");
    isLongPress = true;
    setTimeout(() => {
      if (isLongPress) goEditingNoteScreen();
    }, 800);
  };

  // handle log touch end note box
  const touchEnd = () => {
    console.log("end");
    isLongPress = false;
  };

  const goEditingNoteScreen = () => {
    setSubmitNoteType("editNote");
    route.push({
      pathname: "/(note)",
      params: {
        id: id,
        editedTitle: title,
        editedContent: content,
        direction: direction,
      },
    });
  };

  return (
    <View
      onTouchStart={touchStart}
      onTouchEnd={touchEnd}
      onTouchMove={touchEnd}
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
          flexDirection: "row-reverse",
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
          onPress={goEditingNoteScreen}
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
            textAlign: direction === "right" ? "right" : "left",
          }}
        >
          {displayFullContent
            ? content
            : content
                .replace(/\s+/g, " ")
                .slice(0, content.length > 80 ? 80 : content.length)}
          {!displayFullContent ? "..." : null}
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
