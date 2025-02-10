import { TouchableOpacity, Animated } from "react-native";
import { lightTheme } from "@/constants/theme";
import { useEffect, useRef } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
const AddNoteBTN = ({
  action,
  display,
}: {
  action: () => void;
  display: boolean;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // For opacity
  const slideAnim = useRef(new Animated.Value(20)).current; // For translateY

  useEffect(() => {
    if (display) {
      // Fade in and slide up
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Fade out and slide down
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 20,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [display]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        width: "100%",
        transform: [
          {
            translateY: slideAnim,
          },
        ],
        pointerEvents: display ? "auto" : "none",
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 26,
          right: "5%",
          boxShadow: "0 0 5px #0155B6",
          zIndex: 150,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: lightTheme.primary,
          borderRadius: 50,
          padding: 10,
          width: 60,
          height: 60,
          transitionDuration: "500ms",
        }}
        onPress={action}
        activeOpacity={0.8}
      >
        <FontAwesome6 name="pencil" size={24} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AddNoteBTN;
