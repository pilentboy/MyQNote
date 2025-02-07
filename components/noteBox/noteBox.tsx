import { lightTheme } from "@/constants/theme";
import { View, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FooterText from "./footerText";
import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import useTheme from "@/context/themeProvider";

const NoteBox = ({
  title,
  content,
  date,
  time,
  id,
}: {
  title: string;
  content: string;
  date: string;
  time: string;
  id: string;
}) => {
  const route = useRouter();
  const { theme } = useTheme();
  const [displayFullContent, setDisplayFullContent] = useState<boolean>(false);
  const test = useRef(true);

  // handle log touch on note box
  const touchStart = () => {
    test.current = true;
    console.log(test.current, "from start");
    setTimeout(() => {
      if (test.current) goEditingNoteScreen();
    }, 300);
  };

  const touchEnd = () => {
    test.current = false;
    console.log(test.current, "from end");
  };
  // end handle long touch on note box

  const goEditingNoteScreen = () => {
    route.push({
      pathname: "/(note)",
      params: {
        id: id,
        editedTitle: title,
        editedContent: content,
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
