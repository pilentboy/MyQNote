import { useState, useRef, useContext } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FooterText from "./footerText";
import { useRouter } from "expo-router";
import useTheme from "@/context/themeProvider";
import useSubmitNoteType from "@/context/submitNoteTypeProvider";
import { lightTheme } from "@/constants/theme";
import CopyNoteBTN from "../note/copyNoteBTN";
import ShareNoteBTN from "../note/shareNoteBTN";
import { authContext } from "@/context/authProvider";
import React from "react";

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
  const { accessKey } = useContext(authContext);
  const { setSubmitNoteType } = useSubmitNoteType();
  const [displayFullContent, setDisplayFullContent] = useState<boolean>(false);
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null); // Ref for long press timeout

  // Handle touch start
  const handleTouchStart = () => {
    longPressTimeout.current = setTimeout(() => {
      goEditingNoteScreen();
    }, 500);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
    }
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
    <Pressable
      onPressIn={handleTouchStart}
      onPressOut={handleTouchEnd}
      onTouchMove={handleTouchEnd}
      onPress={() => setDisplayFullContent((pre) => !pre)}
      style={{
        display: "flex",
        backgroundColor: theme === "light" ? lightTheme.secondry : "#2C394B",
        borderRadius: 10,
        justifyContent: "space-around",
        padding: 6,
        width: "100%",
        height: displayFullContent ? "auto" : 120,
        minHeight: 120,
      }}
    >
      {/* Title & Edit */}
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
        <View style={{ flexDirection: "row", gap: 5 }}>
          <TouchableOpacity onPress={goEditingNoteScreen} activeOpacity={0.5}>
            <MaterialIcons
              name="edit"
              size={16}
              color={theme == "light" ? "black" : "white"}
            />
          </TouchableOpacity>
          {/* button for handling copying local/online note to local/online storage */}
       {accessKey && (
            <CopyNoteBTN
              title={title}
              content={content}
              date={date}
              time={time}
              textDirection={direction}
            />
          )}
		  {/* button for sharing note*/}
		    {accessKey && (
				<ShareNoteBTN
				id={id}
              title={title}
              content={content}
              direction={direction}
			  date={date}
			  time={time}
            />
			
          )}
        </View>
      </View>

      {/* Main Content */}
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
        {!displayFullContent && content.length > 80 ? "..." : null}
      </Text>

      {/* Details -- Edited or Added Time Info */}
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
    </Pressable>
  );
};

export default NoteBox;
