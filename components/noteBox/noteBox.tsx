import { useState, useRef, useContext, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FooterText from "./footerText";
import { useRouter } from "expo-router";
import useTheme from "@/context/themeProvider";
import useSubmitNoteType from "@/context/submitNoteTypeProvider";
import { lightTheme } from "@/constants/theme";
import CopyNoteBTN from "../note/copyNoteBTN";
import ShareNoteBTN from "../note/shareNoteBTN";
import { authContext } from "@/context/authProvider";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { set } from "react-hook-form";

const NoteBox = ({
  title,
  content,
  date,
  time,
  id,
  direction,
  noOptions,
  friendName,
}: {
  title: string;
  content: string;
  date: string;
  time: string;
  id: string;
  direction: "right" | "left";
  noOptions?: boolean;
  friendName?: string;
}) => {
  const route = useRouter();
  const { theme } = useTheme();
  const { setSharedNoteUsername } = useContext(authContext);
  const { setSubmitNoteType } = useSubmitNoteType();
  const [displayFullContent, setDisplayFullContent] = useState<boolean>(false);
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null); // Ref for long press timeout
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const iconRef = useRef<any>(null);

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
    // disable editing note if it's a shared note
    console.log(friendName, "tt");
    if (noOptions) {
      setSharedNoteUsername(friendName);
    } else {
      setSharedNoteUsername(undefined);
    }
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

  useEffect(() => {
    console.log(isEditing);
  }, [isEditing]);
  return (
    <Pressable
      onPressIn={handleTouchStart}
      onPressOut={handleTouchEnd}
      onTouchMove={handleTouchEnd}
      onPress={() => {
        setDisplayFullContent((pre) => !pre);
        setIsEditing(false);
      }}
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            position: "relative",
          }}
        >
          {noOptions ? (
            <>
              <FontAwesome5
                name="user"
                size={13}
                color={theme == "light" ? "black" : "white"}
                ref={iconRef}
              />
              <Text
                style={{
                  color: theme == "light" ? "black" : "white",
                  fontFamily: "Vazir",

                  fontSize: 13,
                }}
              >
                {friendName}
              </Text>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={goEditingNoteScreen}
                activeOpacity={0.5}
              >
                <MaterialIcons
                  name="edit"
                  size={16}
                  color={theme == "light" ? "black" : "white"}
                />
              </TouchableOpacity>

              <Feather
                name="more-vertical"
                size={16}
                color={theme == "light" ? "black" : "white"}
                onPress={() => setIsEditing((pre) => !pre)}
              />
              {isEditing && (
                <View
                  style={{
                    position: "absolute",
                    top: -5,
                    left: 40,
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                    borderColor: "gray",
                    borderWidth: 1,
                    backgroundColor:
                      theme === "light" ? lightTheme.secondry : "#2C394B",
                    zIndex: 100,
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  {/* button for handling copying local/online note to local/online storage */}
                  <CopyNoteBTN
                    title={title}
                    content={content}
                    date={date}
                    time={time}
                    textDirection={direction}
                  />
                  {/* button for sharing note*/}
                  <ShareNoteBTN id={id} />
                </View>
              )}
            </>
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
