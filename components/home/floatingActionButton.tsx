import { TouchableOpacity, Animated } from "react-native";
import { lightTheme } from "@/constants/theme";
import { ReactNode, useRef, useEffect } from "react";

const FloatingActionButton = ({
  action,
  display,
  icon,
}: {
  action: () => void;
  display: boolean;
  icon: ReactNode;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // For opacity
  const slideAnim = useRef(new Animated.Value(20)).current; // For translateY

  useEffect(() => {
    console.log(display, "xx");
  }, []);

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
        bottom: 0,
        position: "absolute",
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
        {icon}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FloatingActionButton;
